/**
 * AiPanel — mount point for the Phase 6 AI math assistant.
 * Renders the floating chat (AiChat) when the `aiAssistant` feature flag
 * is on; renders nothing when it is off.
 */

import { AiChat } from './AiChat.js';
import { siteConfig } from '../../data/site.js';
import type { CalculatorShellStrings } from '../../i18n/types.js';

export function AiPanel({ strings }: { strings: CalculatorShellStrings }) {
  if (!siteConfig.featureFlags.aiAssistant) return null;
  return <AiChat strings={strings} />;
}

export default AiPanel;
