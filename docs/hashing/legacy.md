---
sidebar_position: 7
---

# Non Cryptographic Hashes

These are fast hashes for non security purposes. They are NOT cryptographically secure. An attacker can easily cause collisions.

## XXH32

```luau
local XXH32 = Cryptography.Hashing.XXH32
```

### `XXH32(Message: buffer, Seed: number?) -> number`

Extremely fast non cryptographic hash.

```luau
local Hash = XXH32(buffer.fromstring("test"), 0)
print(Hash) -- 32 bit integer
```

Use this for hash tables, bloom filters, checksums, or anywhere you need a fast hash and do not care about security.

## MurMur

```luau
local MurMur = Cryptography.Hashing.MurMur
```

### `MurMur(Message: buffer, Seed: number?) -> number`

Another fast non cryptographic hash function with good distribution.

```luau
local Hash = MurMur(buffer.fromstring("test"), 0)
print(Hash) -- 32 bit integer
```

Same deal as XXH32: great for performance, not secure.

## When to Use These

| Use Case | Algorithm |
|----------|-----------|
| Hash tables | XXH32 or MurMur |
| Bloom filters | XXH32 or MurMur |
| Data deduplication (trusted data) | XXH32 or MurMur |
| **Any security requirement** | SHA256, BLAKE3, or HMAC |

:::warning Not for Security
These hashes are trivially forgeable. If someone might craft malicious input, use a cryptographic hash instead.
:::
