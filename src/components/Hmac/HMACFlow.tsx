import { Position } from 'reactflow';
import FlowDiagram, { smoothEdge } from '../Flow/FlowDiagram';
import './HMACFlow.css';

const nodes = (s, dark) => [
  { id: 'm', position: { x: 0, y: 0 }, data: { label: 'Message' }, style: s(dark ? '#6366f1' : '#818cf8'), sourcePosition: Position.Right },
  { id: 'k', position: { x: 0, y: 70 }, data: { label: 'Secret Key' }, style: s(dark ? '#22c55e' : '#4ade80'), sourcePosition: Position.Right },
  { id: 'h', position: { x: 200, y: 35 }, data: { label: 'HMAC' }, style: s(dark ? '#8b5cf6' : '#a78bfa'), targetPosition: Position.Left, sourcePosition: Position.Right },
  { id: 'mac', position: { x: 380, y: 35 }, data: { label: 'MAC Tag' }, style: s(dark ? '#f59e0b' : '#fbbf24'), targetPosition: Position.Left, sourcePosition: Position.Bottom },
  { id: 'm2', position: { x: 0, y: 160 }, data: { label: 'Message' }, style: s(dark ? '#6366f1' : '#818cf8'), sourcePosition: Position.Right },
  { id: 'k2', position: { x: 0, y: 230 }, data: { label: 'Secret Key' }, style: s(dark ? '#22c55e' : '#4ade80'), sourcePosition: Position.Right },
  { id: 'v', position: { x: 200, y: 160 }, data: { label: 'Verify' }, style: s(dark ? '#8b5cf6' : '#a78bfa'), targetPosition: Position.Left, sourcePosition: Position.Right },
  { id: 'valid', position: { x: 380, y: 160 }, data: { label: 'Valid' }, style: s(dark ? '#16a34a' : '#22c55e'), targetPosition: Position.Left },
];

const edges = [
  smoothEdge('m-h', 'm', 'h'),
  smoothEdge('k-h', 'k', 'h'),
  smoothEdge('h-mac', 'h', 'mac'),
  smoothEdge('mac-v', 'mac', 'v'),
  smoothEdge('m2-v', 'm2', 'v'),
  smoothEdge('k2-v', 'k2', 'v'),
  smoothEdge('v-valid', 'v', 'valid'),
];

const verticalNodes = (s, dark) => [
  { id: 'm', position: { x: 0, y: 0 }, data: { label: 'Message' }, style: s(dark ? '#6366f1' : '#818cf8'), sourcePosition: Position.Bottom },
  { id: 'k', position: { x: 160, y: 0 }, data: { label: 'Secret Key' }, style: s(dark ? '#22c55e' : '#4ade80'), sourcePosition: Position.Bottom },
  { id: 'h', position: { x: 50, y: 80 }, data: { label: 'HMAC' }, style: s(dark ? '#8b5cf6' : '#a78bfa'), targetPosition: Position.Top, sourcePosition: Position.Bottom },
  { id: 'mac', position: { x: 50, y: 160 }, data: { label: 'MAC Tag' }, style: s(dark ? '#f59e0b' : '#fbbf24'), targetPosition: Position.Top, sourcePosition: Position.Bottom },
  { id: 'm2', position: { x: 0, y: 240 }, data: { label: 'Message' }, style: s(dark ? '#6366f1' : '#818cf8'), sourcePosition: Position.Bottom },
  { id: 'k2', position: { x: 160, y: 240 }, data: { label: 'Secret Key' }, style: s(dark ? '#22c55e' : '#4ade80'), sourcePosition: Position.Bottom },
  { id: 'v', position: { x: 50, y: 320 }, data: { label: 'Verify' }, style: s(dark ? '#8b5cf6' : '#a78bfa'), targetPosition: Position.Top, sourcePosition: Position.Bottom },
  { id: 'valid', position: { x: 50, y: 400 }, data: { label: 'Valid' }, style: s(dark ? '#16a34a' : '#22c55e'), targetPosition: Position.Top },
];

const verticalEdges = [
  smoothEdge('m-h', 'm', 'h'),
  smoothEdge('k-h', 'k', 'h'),
  smoothEdge('h-mac', 'h', 'mac'),
  smoothEdge('mac-v', 'mac', 'v'),
  smoothEdge('m2-v', 'm2', 'v'),
  smoothEdge('k2-v', 'k2', 'v'),
  smoothEdge('v-valid', 'v', 'valid'),
];

export default function HMACFlow() {
  return <FlowDiagram className="hmac-flow-wrapper" nodes={nodes} edges={edges} verticalNodes={verticalNodes} verticalEdges={verticalEdges} />;
}
