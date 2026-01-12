/**
 * Script de test pour l'API DeepSeek
 * 
 * Usage:
 *   1. Exportez la variable: export DEEPSEEK_API_KEY=votre_clé_api
 *   2. Ou créez un fichier .env.local avec: DEEPSEEK_API_KEY=votre_clé_api
 *   3. Exécutez: npm run test-deepseek
 *      ou: node test-deepseek-api.js
 */

// Essayer de charger dotenv si disponible (optionnel)
try {
  require('dotenv').config({ path: '.env.local' });
} catch (e) {
  // dotenv n'est pas installé, on utilise directement process.env
}

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';

async function testDeepSeekAPI() {
  console.log('🧪 Test de l\'API DeepSeek\n');
  
  // Vérifier la clé API
  if (!DEEPSEEK_API_KEY) {
    console.error('❌ Erreur: DEEPSEEK_API_KEY n\'est pas définie');
    console.log('\n💡 Solutions:');
    console.log('   1. Créez un fichier .env.local avec: DEEPSEEK_API_KEY=votre_clé');
    console.log('   2. Ou exportez la variable: export DEEPSEEK_API_KEY=votre_clé');
    process.exit(1);
  }

  console.log('✅ Clé API trouvée');
  console.log(`📡 URL de l'API: ${DEEPSEEK_API_URL}\n`);

  // Préparer la requête
  const testMessage = {
    model: 'deepseek-chat',
    messages: [
      {
        role: 'user',
        content: 'Bonjour! Peux-tu me dire bonjour en français et confirmer que tu fonctionnes correctement?'
      }
    ],
    temperature: 0.7,
    max_tokens: 100
  };

  try {
    console.log('📤 Envoi de la requête...');
    console.log(`   Modèle: ${testMessage.model}`);
    console.log(`   Message: "${testMessage.messages[0].content}"\n`);

    const response = await fetch(DEEPSEEK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify(testMessage)
    });

    console.log(`📥 Statut de la réponse: ${response.status} ${response.statusText}`);

    if (!response.ok) {
      const errorData = await response.text();
      console.error(`\n❌ Erreur API:`);
      console.error(`   Code: ${response.status}`);
      console.error(`   Message: ${errorData}`);
      
      if (response.status === 401) {
        console.error('\n💡 Vérifiez que votre clé API est correcte');
      } else if (response.status === 429) {
        console.error('\n💡 Limite de taux atteinte, attendez un moment');
      }
      
      process.exit(1);
    }

    const data = await response.json();
    
    console.log('\n✅ Réponse reçue avec succès!\n');
    console.log('📊 Détails de la réponse:');
    console.log(`   Modèle utilisé: ${data.model || 'N/A'}`);
    console.log(`   ID de la requête: ${data.id || 'N/A'}`);
    console.log(`   Nombre de tokens: ${data.usage?.total_tokens || 'N/A'}`);
    console.log(`   Tokens utilisés (prompt): ${data.usage?.prompt_tokens || 'N/A'}`);
    console.log(`   Tokens utilisés (completion): ${data.usage?.completion_tokens || 'N/A'}\n`);
    
    if (data.choices && data.choices.length > 0) {
      const message = data.choices[0].message;
      console.log('💬 Réponse du modèle:');
      console.log(`   Rôle: ${message.role}`);
      console.log(`   Contenu:\n   "${message.content}"\n`);
    }

    console.log('🎉 Test réussi! L\'API DeepSeek fonctionne correctement.\n');
    
    return data;
  } catch (error) {
    console.error('\n❌ Erreur lors de la requête:');
    console.error(`   ${error.message}`);
    
    if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
      console.error('\n💡 Vérifiez votre connexion internet');
    }
    
    process.exit(1);
  }
}

// Exécuter le test
testDeepSeekAPI();

