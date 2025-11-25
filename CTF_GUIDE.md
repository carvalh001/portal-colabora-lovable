# 🎯 CTF Challenge - Guia Completo

## 📖 O que é CTF?

**CTF (Capture The Flag)** é um desafio de segurança e investigação onde você precisa encontrar "flags" (strings secretas) escondidas na plataforma. Cada flag encontrada garante pontos!

---

## 🎮 Como Jogar

### 1. Encontre as Flags

Explore a plataforma e procure por strings no formato:

```
FLAG{conteudo_da_flag}
```

As flags podem estar escondidas em diferentes lugares:
- 🔍 Código HTML (inspecione elementos)
- 💻 Console do navegador
- 🌐 Endpoints de API
- 🔐 Código-fonte ofuscado
- 📱 Headers HTTP

### 2. Submeta sua Flag

1. Acesse a página **CTF Challenge** no menu
2. Preencha seus dados:
   - Nome completo
   - Email
   - A flag encontrada
3. Clique em **Submeter Flag**

### 3. Acompanhe o Ranking

- Veja sua posição no **Leaderboard**
- Compare seus pontos com outros participantes
- Tente conquistar o topo! 🏆

---

## 📊 Sistema de Pontuação

| Dificuldade | Pontos | Slots Disponíveis | Cor |
|-------------|--------|-------------------|-----|
| 🟢 Fácil | 10 pts | 10 | Verde |
| 🟡 Média | 20 pts | 5 | Amarelo |
| 🔴 Difícil | 30 pts | 3 | Vermelho |

### Pontuação Máxima Possível
Se você encontrar as 3 flags: **60 pontos** (10 + 20 + 30)

---

## ⚠️ Regras Importantes

1. **Uma submissão por dificuldade**: Você pode submeter apenas UMA flag de cada nível
2. **Limite de participantes**: Há um número limitado de slots por dificuldade
3. **Primeiro a chegar, primeiro servido**: Quem submeter primeiro, garante a vaga
4. **Sem brute force**: Tentativas repetidas podem ser bloqueadas
5. **Jogo limpo**: Use apenas técnicas éticas de investigação

---

## 💡 Dicas Iniciais

### Para Iniciantes

1. **Inspecione a página** (F12 ou Ctrl+Shift+I)
   - Olhe o código HTML
   - Verifique elementos ocultos
   - Analise classes CSS

2. **Abra o Console** (F12 > Console)
   - Procure por mensagens
   - Teste comandos JavaScript
   - Verifique logs do sistema

3. **Explore a interface**
   - Passe o mouse sobre elementos
   - Clique com botão direito
   - Teste diferentes páginas

### Para Intermediários

1. **Analise requisições HTTP**
   - Use a aba Network do DevTools
   - Verifique headers de resposta
   - Teste endpoints diferentes

2. **Investigue o código-fonte**
   - Veja arquivos .js e .jsx
   - Procure por comentários
   - Analise variáveis suspeitas

3. **Decodifique dados**
   - Base64
   - Hexadecimal
   - ROT13

### Para Avançados

1. **Engenharia reversa**
   - Analise o bundle JavaScript
   - Procure por padrões
   - Use ferramentas de debugging

2. **API exploration**
   - Teste endpoints não documentados
   - Analise payloads de resposta
   - Verifique headers customizados

---

## 🛠️ Ferramentas Úteis

### Navegador
- **DevTools** (F12): Inspeção de elementos, console, network
- **View Source** (Ctrl+U): Ver código-fonte da página

### Online Tools
- **Base64 Decode**: base64decode.org
- **CyberChef**: gchq.github.io/CyberChef
- **ROT13**: rot13.com

### Terminal
```bash
# Decode Base64
echo "texto_codificado" | base64 -d

# Fazer requisição HTTP com headers
curl -I http://api.exemplo.com/endpoint
```

---

## 🎯 Localizações das Flags

### 🟢 Flag Fácil (10pts)
**Localização**: Interface do usuário
**Técnica**: Inspeção de elementos
**Dica**: "Nem tudo que está na tela é visível aos olhos..."

### 🟡 Flag Média (20pts)
**Localização**: API Backend
**Técnica**: Exploração de endpoints
**Dica**: "Algumas rotas não estão no mapa... mas existem."

### 🔴 Flag Difícil (30pts)
**Localização**: Código-fonte
**Técnica**: Análise e decodificação
**Dica**: "O que parece aleatório, pode ser um padrão codificado."

---

## 🏆 Estratégias Vencedoras

1. **Seja metódico**: Explore cada parte da plataforma sistematicamente
2. **Documente**: Anote o que você encontrar
3. **Pense fora da caixa**: Flags podem estar em lugares inusitados
4. **Use ferramentas**: DevTools é seu melhor amigo
5. **Seja rápido**: Slots são limitados!

---

## ❓ FAQ

**Q: Posso usar ferramentas automatizadas?**
A: Não. O desafio é individual e manual.

**Q: Posso compartilhar flags com outros?**
A: Não é recomendado. O desafio é mais divertido quando você encontra sozinho!

**Q: Tentei várias vezes e não consigo. E agora?**
A: Leia as dicas novamente, use as ferramentas sugeridas, e explore outras áreas.

**Q: Encontrei todas as flags! O que fazer?**
A: Parabéns! 🎉 Veja sua posição no leaderboard e ajude outros (sem dar spoilers).

**Q: Há novas flags periodicamente?**
A: Isso depende da administração do CTF. Fique atento a anúncios!

---

## 🎊 Boa Sorte!

Lembre-se: o objetivo é aprender e se divertir. Cada flag encontrada é uma vitória!

**Happy Hunting! 🎯🔍**

---

## 📞 Suporte

Problemas técnicos ou dúvidas sobre as regras?
Entre em contato com a administração através do sistema de mensagens.

