/**
 * Init Hook: Activate Advisor Board on Project Load
 *
 * This hook activates the advisor-chief automatically when the project opens
 * in Claude Code, displaying the greeting and making the conselho immediately available.
 */

module.exports = {
  name: 'init-advisor',
  description: 'Ativa o board de conselheiros ao abrir o projeto',

  // Hook triggers on project initialization
  triggers: ['on-project-open', 'on-session-start'],

  async execute(context) {
    // Log activation
    console.log('🧠 Ativando Board de Conselheiros...');

    // Activate advisor-chief skill
    const skill = '/squad-advisor:agents:advisor-chief';

    // Return command to execute
    return {
      type: 'execute-skill',
      skill: skill,
      showOutput: true,
      auto: true
    };
  }
};
