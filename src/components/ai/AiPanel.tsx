/**
 * AiPanel — reserved slot for the AI assistant panel.
 * The `aiAssistant` feature flag is off in Phase 1, so this renders null
 * and proves the gating pattern without showing anything unimplemented.
 */

import { Panel } from '../ui/index.js';
import { siteConfig } from '../../data/site.js';

export function AiPanel() {
  if (!siteConfig.featureFlags.aiAssistant) return null;

  return (
    <Panel title="AI assistant" className="mt-3">
      <p className="text-sm text-slate-600 dark:text-slate-300">
        AI assistance is on the roadmap: natural-language math commands and step-by-step
        explanations are planned for a future phase.
      </p>
    </Panel>
  );
}

export default AiPanel;
