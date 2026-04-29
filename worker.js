export default {
  async fetch(request, env) {
    const cors = {'Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'POST,OPTIONS','Access-Control-Allow-Headers':'Content-Type,x-api-key,anthropic-version'};
    if (request.method === 'OPTIONS') return new Response(null, {headers: cors});
    try {
      const body = await request.json();
      const r = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {'Content-Type':'application/json','anthropic-version':'2023-06-01','x-api-key':env.ANTHROPIC_KEY},
        body: JSON.stringify(body)
      });
      const d = await r.json();
      return new Response(JSON.stringify(d), {status:r.status, headers:{'Content-Type':'application/json',...cors}});
    } catch(e) {
      return new Response(JSON.stringify({error:e.message}), {status:500, headers:{'Content-Type':'application/json',...cors}});
    }
  }
};