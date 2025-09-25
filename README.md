# Ateliê da Flavia - Site Profissional

Site profissional para o Ateliê da Flavia, especializado em roupas de crochê, bolsas e acessórios artesanais.

## 🎨 Design

O site foi desenvolvido com uma estética moderna e aconchegante, utilizando tons terrosos que transmitem naturalidade e sofisticação:

- **Cores principais**: Bege, marrom, terracota e verde oliva
- **Tipografia**: Playfair Display (títulos) e Inter (texto)
- **Layout responsivo** para desktop, tablet e mobile

## ✨ Funcionalidades

### Página Inicial
- Hero section com destaque para produtos em crochê
- Produtos em destaque
- Categorias organizadas (Roupas, Bolsas, Acessórios)

### Catálogo de Produtos
- Filtros por categoria
- Modal de detalhes do produto
- Imagens de alta qualidade
- Descrições detalhadas

### Carrinho de Compras
- Adicionar/remover produtos
- Controle de quantidade
- Cálculo automático do total
- Persistência no localStorage
- Checkout integrado com WhatsApp

### Páginas Institucionais
- **Sobre**: História do ateliê e processo artesanal
- **Contato**: Formulário e links para redes sociais

### Recursos Técnicos
- Layout 100% responsivo
- Navegação suave (smooth scroll)
- Animações CSS
- Otimização de imagens
- SEO otimizado
- Performance otimizada

## 🚀 Como usar

1. Abra o arquivo `index.html` em um navegador web
2. O site está pronto para uso imediato
3. Para personalizar:
   - Edite os produtos no arquivo `script.js`
   - Ajuste as cores no arquivo `styles.css`
   - Modifique o conteúdo no arquivo `index.html`

## 📱 Integração com WhatsApp

O site possui integração completa com WhatsApp para:
- Finalização de compras
- Envio de mensagens de contato
- Atendimento ao cliente

**Importante**: Altere o número do WhatsApp no arquivo `script.js` (linha com `5511999999999`) para o número real do ateliê.

## 🛠️ Personalização

### Alterando Produtos
No arquivo `script.js`, modifique o array `products` com seus próprios produtos:

```javascript
const products = [
    {
        id: 1,
        name: "Nome do Produto",
        category: "roupas", // ou "bolsas" ou "acessorios"
        price: 89.90,
        image: "URL_da_imagem",
        description: "Descrição do produto",
        featured: true // para aparecer na seção de destaques
    }
];
```

### Alterando Cores
No arquivo `styles.css`, modifique as variáveis CSS no `:root`:

```css
:root {
    --primary-color: #8B4513; /* Cor principal */
    --secondary-color: #D2B48C; /* Cor secundária */
    --accent-color: #CD853F; /* Cor de destaque */
    /* ... outras cores */
}
```

### Alterando Informações de Contato
- WhatsApp: Altere o número em `script.js`
- Instagram: Altere o link no HTML
- E-mail: Altere o endereço no HTML

## 📊 SEO e Performance

O site inclui:
- Meta tags otimizadas
- Estrutura semântica HTML5
- Imagens com lazy loading
- Compressão de recursos
- Schema markup para produtos

## 🌐 Compatibilidade

- ✅ Chrome, Firefox, Safari, Edge
- ✅ Dispositivos móveis (iOS/Android)
- ✅ Tablets
- ✅ Desktop

## 📞 Suporte

Para dúvidas sobre personalização ou uso do site, entre em contato através do WhatsApp integrado no próprio site.

---

**Desenvolvido com ❤️ para o Ateliê da Flavia**