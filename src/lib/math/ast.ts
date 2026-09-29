/**
 * Phase 3 expression AST: the parsed shape of a single-variable math
 * expression. Produced by the parser, consumed by the compiler. Positions
 * refer to the *normalized* source string (see normalize.ts).
 */

export type BinaryOperator = '+' | '-' | '*' | '/' | '^';

/** Character offsets into the normalized source (end is exclusive). */
export interface SourceSpan {
  start: number;
  end: number;
}

export type AstNode =
  | { kind: 'number'; value: number; span: SourceSpan }
  | { kind: 'variable'; name: string; span: SourceSpan }
  | { kind: 'constant'; name: string; span: SourceSpan }
  | { kind: 'unary'; operator: '-'; operand: AstNode; span: SourceSpan }
  | {
      kind: 'binary';
      operator: BinaryOperator;
      left: AstNode;
      right: AstNode;
      span: SourceSpan;
    }
  | { kind: 'call'; name: string; args: AstNode[]; span: SourceSpan };

/** Collect the distinct variable names referenced by a subtree. */
export function collectVariables(node: AstNode, into: Set<string> = new Set()): Set<string> {
  switch (node.kind) {
    case 'number':
    case 'constant':
      break;
    case 'variable':
      into.add(node.name);
      break;
    case 'unary':
      collectVariables(node.operand, into);
      break;
    case 'binary':
      collectVariables(node.left, into);
      collectVariables(node.right, into);
      break;
    case 'call':
      for (const arg of node.args) collectVariables(arg, into);
      break;
  }
  return into;
}
