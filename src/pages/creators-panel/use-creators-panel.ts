import { useShallow } from 'zustand/react/shallow';
import type {
  AppNode,
  AppState,
  EntityDetailState,
  ToolsState,
} from '../../store/types';
import { useStore } from '../../store';
import {
  addEdge,
  MarkerType,
  useReactFlow,
  type Connection,
  type Edge,
  type OnConnectEnd,
  type ReactFlowProps,
} from '@xyflow/react';
import { nanoid } from 'nanoid';
import { useCallback, useMemo, type MouseEvent } from 'react';
import { EDGE, NODE, TOOL } from '../../enums';
import { nodeTypes } from '../../constants/node-types';
import { useToolShortcuts } from '../../hooks/use-tool-shortcuts';
import { useToolsStore } from '../../store/tools-store';
import { useEntityDetailStore } from '../../store/entity-detail-store';

const selector = (state: AppState) => ({
  nodes: state.nodes,
  getNodes: state.getNodes,
  edges: state.edges,
  getEdges: state.getEdges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  setNodes: state.setNodes,
  setEdges: state.setEdges,
  onDragOver: state.onDragOver,
  isValidConnection: state.isValidConnection,
});

const toolSelector = (state: ToolsState) => ({
  selectedTool: state.selectedTool,
});

const entityDetailSelector = (state: EntityDetailState) => ({
  selectedEntity: state.selectedEntity,
  setSelectedEntity: state.setSelectedEntity,
});

const OFFSET = {
  X: 50,
  Y: 50,
};

export const useCreatorsPanel = () => {
  const { screenToFlowPosition } = useReactFlow();
  const {
    edges,
    getEdges,
    nodes,
    getNodes,
    onEdgesChange,
    onNodesChange,
    setNodes,
    setEdges,
    onDragOver,
    isValidConnection,
  } = useStore(useShallow(selector));
  const { selectedTool } = useToolsStore(useShallow(toolSelector));
  const { selectedEntity, setSelectedEntity } = useEntityDetailStore(
    useShallow(entityDetailSelector),
  );

  useToolShortcuts();

  const selectedToolType = selectedTool ?? EDGE.BEZIER;

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      const nodeType = event.dataTransfer.getData('nodeType');
      if (!nodeType) {
        console.error('No node type found in data transfer');
        return;
      }
      const allowedNodeTypes = Object.keys(nodeTypes);
      if (!allowedNodeTypes.includes(nodeType)) {
        console.error(`Invalid node type: ${nodeType}`);
        return;
      }

      event.preventDefault();
      const position = screenToFlowPosition({
        x: event.clientX - OFFSET.X,
        y: event.clientY - OFFSET.Y,
      });
      const node = {
        id: nanoid(),
        type: nodeType as NODE,
        position,
        data: { label: 'Node' },
      };
      setNodes(nodes.concat(node));
    },
    [nodes, screenToFlowPosition, setNodes],
  );

  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges(
        addEdge(
          {
            ...connection,
            type: selectedToolType,
            data: { label: 'Edge' },
            markerEnd: {
              type: MarkerType.ArrowClosed,
              height: 40,
              width: 20,
            },
          },
          edges,
        ),
      );
    },
    [edges, selectedToolType, setEdges],
  );

  const onConnectEnd: OnConnectEnd = useCallback(
    (event, connectionState) => {
      if (!connectionState.fromNode?.id) return;
      if (!connectionState.isValid) {
        const { clientX, clientY } =
          'changedTouches' in event ? event.changedTouches[0] : event;
        const id = nanoid();
        const newNode = {
          id,
          type: NODE.BASIC,
          position: screenToFlowPosition({
            x: clientX,
            y: clientY,
          }),
          data: { label: 'Node' },
        };
        setNodes(nodes.concat(newNode));
        setEdges(
          edges.concat({
            id,
            data: { label: 'Edge' },
            type: selectedToolType,
            source: connectionState.fromNode.id,
            target: id,
            markerEnd: { type: MarkerType.ArrowClosed, height: 40, width: 20 },
          }),
        );
      }
    },
    [edges, nodes, screenToFlowPosition, selectedToolType, setEdges, setNodes],
  );

  const onNodeClick = useCallback(
    (_: MouseEvent, node: AppNode) => {
      const nodes = getNodes();
      const edges = getEdges();

      const outgoingEdges = edges.filter((edge) => edge.source === node.id);
      const targetNodes = outgoingEdges.map((edge) =>
        nodes.find((node) => node.id === edge.target),
      );
      const incomingEdges = edges.filter((edge) => edge.target === node.id);
      const sourceNodes = incomingEdges.map((edge) =>
        nodes.find((node) => node.id === edge.source),
      );
      const connectedNodes = [...sourceNodes, ...targetNodes];
      const connectedEdges = [...incomingEdges, ...outgoingEdges];
      const connectedNodeIds = new Set(
        connectedNodes.map((node) => (node ? node.id : null)).filter(Boolean),
      );
      const connectedEdgeIds = new Set(
        connectedEdges.map((edge) => (edge ? edge.id : null)).filter(Boolean),
      );
      const updatedNodes = nodes.map((node) => ({
        ...node,
        data: { ...node.data, highlighted: connectedNodeIds.has(node.id) },
      }));
      const updatedEdges = edges.map((edge) => ({
        ...edge,
        data: { ...edge.data, highlighted: connectedEdgeIds.has(edge.id) },
      }));
      console.log({ updatedNodes, updatedEdges });
      setNodes(updatedNodes);
      setEdges(updatedEdges);
      setSelectedEntity({ type: 'NODE', detail: node });
    },
    [getEdges, getNodes, setEdges, setNodes, setSelectedEntity],
  );

  const onEdgeClick = useCallback(
    (_: MouseEvent, edge: Edge) => {
      const nodes = getNodes();
      const edges = getEdges();

      const sourceNodeId = edge.source;
      const targetNodeId = edge.target;

      const updatedNodes = nodes.map((node) => ({
        ...node,
        data: {
          ...node.data,
          highlighted: node.id === sourceNodeId || node.id === targetNodeId,
        },
      }));
      const updatedEdges = edges.map((e) => ({
        ...e,
        data: { ...e.data, highlighted: e.id === edge.id },
      }));

      setNodes(updatedNodes);
      setEdges(updatedEdges);
      setSelectedEntity({ type: 'EDGE', detail: edge });
    },
    [getEdges, getNodes, setEdges, setNodes, setSelectedEntity],
  );

  const onPaneClick = useCallback(() => {
    const nodes = getNodes();
    const edges = getEdges();

    const updatedNodes = nodes.map((node) => ({
      ...node,
      data: { ...node.data, highlighted: false },
    }));
    const updatedEdges = edges.map((edge) => ({
      ...edge,
      data: { ...edge.data, highlighted: false },
    }));

    setEdges(updatedEdges);
    setNodes(updatedNodes);
    setSelectedEntity(null);
  }, [getEdges, getNodes, setEdges, setNodes, setSelectedEntity]);

  const options = useMemo(() => {
    if (selectedTool === TOOL.MOVE) {
      return {
        selectionOnDrag: true,
        panOnDrag: false,
        panOnScroll: false,
        zoomOnScroll: false,
        nodesDraggable: true,
      } as Partial<ReactFlowProps>;
    } else if (selectedTool === TOOL.HAND) {
      return {
        selectionOnDrag: false,
        panOnDrag: true,
        panOnScroll: false,
        zoomOnScroll: true,
        nodesDraggable: false,
      } as Partial<ReactFlowProps>;
    }
  }, [selectedTool]);

  return {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onDrop,
    onDragOver,
    isValidConnection,
    onConnectEnd,
    onNodeClick,
    onEdgeClick,
    onPaneClick,
    options,
    selectedEntity,
  };
};
