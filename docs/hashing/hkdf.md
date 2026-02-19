---
sidebar_position: 6
---

# HKDF

import HkdfFlow from '@site/src/components/Hkdf/HKDFFlow';

HMAC based Key Derivation Function. The standard way to derive one or more cryptographic keys from a shared secret, Diffie Hellman output, or other non-uniform key material. Specified in [RFC 5869](https://www.rfc-editor.org/rfc/rfc5869).

```luau
local HKDF = Cryptography.Hashing.HKDF
```

## Function

### `HKDF(IKM: buffer, Salt: buffer?, Info: buffer?, Length: number, HashFn: function, BlockSize: number, HashLength: number, BigEndian: boolean?) -> buffer`

Derives a key of the specified length from input keying material using extract-then-expand.

```luau
local SHA256 = Cryptography.Hashing.SHA2.SHA256
local CSPRNG = Cryptography.Utilities.CSPRNG

local IKM = buffer.fromstring("shared secret from key exchange")
local Salt = CSPRNG.RandomBytes(32)
local Info = buffer.fromstring("encryption key")

-- Derive a 32-byte key
local DerivedKey = HKDF(IKM, Salt, Info, 32, SHA256, 64, 32)
```

**Parameters:**
- `IKM`: Input Keying Material, the secret to derive from
- `Salt`: Optional random value for the Extract step (can be nil)
- `Info`: Context string to bind the derived key to its purpose (can be nil)
- `Length`: How many bytes to derive (max 255 * HashLength)
- `HashFn`: The hash function to use (must return string, buffer)
- `BlockSize`: The block size of the hash function (64 for SHA256, 128 for SHA512)
- `HashLength`: The output size of the hash function (32 for SHA256, 64 for SHA512)
- `BigEndian`: Set to `true` for SHA2, `false` for SHA3/BLAKE family

## How It Works

HKDF has two steps:

**Extract** takes your input key material and a salt, and produces a fixed length Pseudo Random Key (PRK) using HMAC. This step concentrates the entropy from non uniform inputs into a uniformly random key.

```
PRK = HMAC(Salt, IKM)
```

**Expand** takes the PRK and an info string, and produces as many bytes as you need by chaining HMAC calls with a counter from 1 to 255.

```
T(1) = HMAC(PRK, Info || 0x01)
T(2) = HMAC(PRK, T(1) || Info || 0x02)
T(n) = HMAC(PRK, T(n-1) || Info || 0x03)
OKM  = T(1) || T(2) || ... truncated to Length
```

The Extract step is what gives HKDF its KDF security. If your input is already a uniformly random key, Extract is not strictly needed and you could use HMAC directly as a PRF. But if your input comes from a Diffie-Hellman exchange or any other source that is random but not uniformly distributed, the Extract step is essential.

<HkdfFlow />

## Key Splitting

The most common use of HKDF is deriving multiple independent keys from a single shared secret. Use different info strings to separate keys by purpose.

```luau
local SHA256 = Cryptography.Hashing.SHA2.SHA256

local SharedSecret = buffer.fromstring("output from key exchange")

-- Derive separate keys for encryption and authentication
local EncKey = HKDF(SharedSecret, nil, buffer.fromstring("encryption"), 32, SHA256, 64, 32)
local MacKey = HKDF(SharedSecret, nil, buffer.fromstring("authentication"), 32, SHA256, 64, 32)
```

These two keys are cryptographically independent. Knowing one reveals nothing about the other.

## Salt vs Info

Salt and info serve different purposes and are not interchangeable.

**Salt** is used in the Extract step. It is meant to be a fixed random value or left nil. The salt improves key derivation from non uniform inputs like Diffie Hellman outputs. If you are varying a value per message or per session, that value should go in info, not salt.

**Info** is used in the Expand step. It binds a derived key to a specific context. This is where you put nonces, labels, and anything that should make one derived key different from another.

:::warning
A common mistake is to keep the same IKM and info but change the salt for each derivation. This works in practice because you still get PRF security from HMAC, but it does not match the HKDF security definition which assumes a single salt. Put varying data in info instead.
:::

## When to Use It

HKDF is the right choice when you need to derive keys from a Diffie Hellman key exchange output, split a single master key into multiple purpose specific keys, or convert non uniform secret material into a proper symmetric key.

:::danger
Do **not** use HKDF for password hashing. Passwords have low entropy and need a slow hash like Argon2id or scrypt to resist brute force attacks. HKDF is fast by design and offers no protection against offline password guessing.
:::

If you are building something new and do not need HMAC compatibility, BLAKE3 DeriveKey is a faster alternative that combines extraction and expansion into a single step.
