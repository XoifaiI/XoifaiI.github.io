
import { Position } from 'reactflow';
import FlowDiagram, { smoothEdge } from '../Flow/FlowDiagram';
import './HKDFFlow.css';

const nodes = (s, dark) => [
  { id: 'ikm', position: { x: 0, y: 0 }, data: { label: 'IKM' }, style: s(dark ? '#6366f1' : '#818cf8'), sourcePosition: Position.Right },
  { id: 'salt', position: { x: 0, y: 80 }, data: { label: 'Salt' }, style: s(dark ? '#22c55e' : '#4ade80'), sourcePosition: Position.Right },
  { id: 'extract', position: { x: 180, y: 40 }, data: { label: 'Extract' }, style: s(dark ? '#8b5cf6' : '#a78bfa'), targetPosition: Position.Left, sourcePosition: Position.Right },
  { id: 'prk', position: { x: 340, y: 40 }, data: { label: 'PRK' }, style: s(dark ? '#f59e0b' : '#fbbf24'), targetPosition: Position.Left, sourcePosition: Position.Bottom },

  { id: 'info1', position: { x: 340, y: 160 }, data: { label: 'Info: "enc"' }, style: s(dark ? '#6366f1' : '#818cf8'), sourcePosition: Position.Right },
  { id: 'exp1', position: { x: 520, y: 130 }, data: { label: 'Expand' }, style: s(dark ? '#8b5cf6' : '#a78bfa'), targetPosition: Position.Left, sourcePosition: Position.Right },
  { id: 'ok1', position: { x: 680, y: 130 }, data: { label: 'Encryption Key' }, style: s(dark ? '#f59e0b' : '#fbbf24'), targetPosition: Position.Left },

  { id: 'info2', position: { x: 340, y: 280 }, data: { label: 'Info: "mac"' }, style: s(dark ? '#6366f1' : '#818cf8'), sourcePosition: Position.Right },
  { id: 'exp2', position: { x: 520, y: 250 }, data: { label: 'Expand' }, style: s(dark ? '#8b5cf6' : '#a78bfa'), targetPosition: Position.Left, sourcePosition: Position.Right },
  { id: 'ok2', position: { x: 680, y: 250 }, data: { label: 'MAC Key' }, style: s(dark ? '#f59e0b' : '#fbbf24'), targetPosition: Position.Left },
];

const edges = [
  smoothEdge('ikm-ext', 'ikm', 'extract'),
  smoothEdge('salt-ext', 'salt', 'extract'),
  smoothEdge('ext-prk', 'extract', 'prk'),
  smoothEdge('prk-exp1', 'prk', 'exp1'),
  smoothEdge('prk-exp2', 'prk', 'exp2'),
  smoothEdge('info1-exp1', 'info1', 'exp1'),
  smoothEdge('info2-exp2', 'info2', 'exp2'),
  smoothEdge('exp1-ok1', 'exp1', 'ok1'),
  smoothEdge('exp2-ok2', 'exp2', 'ok2'),
];

const verticalNodes = (s, dark) => [
  { id: 'ikm', position: { x: 20, y: 0 }, data: { label: 'IKM' }, style: s(dark ? '#6366f1' : '#818cf8'), sourcePosition: Position.Bottom },
  { id: 'salt', position: { x: 180, y: 0 }, data: { label: 'Salt' }, style: s(dark ? '#22c55e' : '#4ade80'), sourcePosition: Position.Bottom },
  { id: 'extract', position: { x: 80, y: 90 }, data: { label: 'Extract' }, style: s(dark ? '#8b5cf6' : '#a78bfa'), targetPosition: Position.Top, sourcePosition: Position.Bottom },
  { id: 'prk', position: { x: 80, y: 180 }, data: { label: 'PRK' }, style: s(dark ? '#f59e0b' : '#fbbf24'), targetPosition: Position.Top, sourcePosition: Position.Bottom },

  { id: 'info1', position: { x: 10, y: 290 }, data: { label: 'Info: "enc"' }, style: s(dark ? '#6366f1' : '#818cf8'), sourcePosition: Position.Right },
  { id: 'exp1', position: { x: 170, y: 290 }, data: { label: 'Expand' }, style: s(dark ? '#8b5cf6' : '#a78bfa'), targetPosition: Position.Top, sourcePosition: Position.Bottom },
  { id: 'ok1', position: { x: 145, y: 380 }, data: { label: 'Encryption Key' }, style: s(dark ? '#f59e0b' : '#fbbf24'), targetPosition: Position.Top },

  { id: 'info2', position: { x: 10, y: 480 }, data: { label: 'Info: "mac"' }, style: s(dark ? '#6366f1' : '#818cf8'), sourcePosition: Position.Right },
  { id: 'exp2', position: { x: 170, y: 480 }, data: { label: 'Expand' }, style: s(dark ? '#8b5cf6' : '#a78bfa'), targetPosition: Position.Top, sourcePosition: Position.Bottom },
  { id: 'ok2', position: { x: 155, y: 570 }, data: { label: 'MAC Key' }, style: s(dark ? '#f59e0b' : '#fbbf24'), targetPosition: Position.Top },
];

const verticalEdges = [
  smoothEdge('ikm-ext', 'ikm', 'extract'),
  smoothEdge('salt-ext', 'salt', 'extract'),
  smoothEdge('ext-prk', 'extract', 'prk'),
  smoothEdge('prk-exp1', 'prk', 'exp1'),
  smoothEdge('prk-exp2', 'prk', 'exp2'),
  smoothEdge('info1-exp1', 'info1', 'exp1'),
  smoothEdge('info2-exp2', 'info2', 'exp2'),
  smoothEdge('exp1-ok1', 'exp1', 'ok1'),
  smoothEdge('exp2-ok2', 'exp2', 'ok2'),
];

export default function HKDFFlow() {
  return <FlowDiagram className="hkdf-flow-wrapper" nodes={nodes} edges={edges} verticalNodes={verticalNodes} verticalEdges={verticalEdges} />;
}