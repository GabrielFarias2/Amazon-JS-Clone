export async function getGreeting() {
  
  const response = await fetch('https://supersimplebackend.dev/greeting');

  const text = await response.text();

  console.log('Resposta do async/await:', text);
};

export async function postGreeting() {
  const postRespose = await fetch('https://supersimplebackend.dev/greeting', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },

  body: JSON.stringify({
    name: 'Gabriel'
  })  
});

const text = await postRespose.text();
console.log('Resposta do POST:', text);
};

export async function getGreetingComErro() {
  try {
    
    const response = await fetch('https://URL_QUE_VAI_FALHAR.dev');
    const text = await response.text();
    console.log(text);

  } catch (error) {
    console.error('Um erro de rede aconteceu!', error);
  }
};

export async function postInvalido() {
  try {
    const response = await fetch('https://supersimplebackend.dev/greeting', {
      method: 'POST'
      // Não vamos enviar o "body" de propósito, para causar um erro 400
    });

    // 1. Checamos se a resposta NÃO foi OK (status 200-299)
    if (!response.ok) { // response.ok é um boolean
      // 2. Se não foi OK, jogamos um erro manualmente para o catch
      throw new Error(`Erro HTTP! Status: ${response.status}`);
    }

    const text = await response.text();
    console.log(text);

  } catch (error) {
    // 3. Agora nosso catch pega erros de rede E erros lógicos!
    console.error('Falha no pedido:', error);
  }
};
