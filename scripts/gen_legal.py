#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Gera as páginas legais da CrieAlgo em pt/en/es/br."""
import os

OUT = os.path.join(os.path.dirname(__file__), '..', 'public', 'legal')

DATA = {
 'pt': {
  'lang': 'pt', 'file': 'pt.html',
  'title': 'Políticas e Privacidade · CrieAlgo',
  'home': '/', 'homeLabel': 'Voltar ao site',
  'updated': 'Última atualização: 7 de agosto de 2026',
  'contactMail': 'contact@criealgo.pro',
  'wa': '+351912880264', 'waShow': '+351 912 880 264',
  'addr': 'Rua Prof. Manuel de Barros, 18, Esposende, Portugal',
  'h1': 'Políticas, Privacidade e Consentimento',
  'intro': 'Esta página reúne, de forma clara e sem juridiquês desnecessário, como a CrieAlgo trata os seus dados, que cookies utiliza e em que termos presta os seus serviços. Aplica-se ao site criealgo.pro e a todos os seus subdomínios e versões de idioma.',
  'secPriv': 'Política de Privacidade',
  'priv': [
    ('Quem somos', 'A CrieAlgo é um estúdio digital independente de design, web e IA, com base em {addr}. Para qualquer assunto de privacidade, escreva para {mail}.'),
    ('Que dados recolhemos', 'Recolhemos apenas os dados que nos entrega voluntariamente: nome, email, telefone (opcional), link do seu site ou redes sociais e a descrição do seu projeto, através do formulário Raio-X, do chat ou de contacto direto por email. Recolhemos também dados técnicos básicos de navegação (páginas visitadas, tipo de dispositivo) quando aceita cookies de análise.'),
    ('Para que usamos', 'Usamos os seus dados para responder ao seu pedido, preparar o diagnóstico Raio-X, prestar os serviços contratados e, apenas com o seu consentimento explícito, enviar comunicações ocasionais por email sobre serviços e novidades da CrieAlgo. Não vendemos nem cedemos os seus dados a terceiros para fins de marketing.'),
    ('Onde ficam guardados', 'Os dados de contacto e de email marketing são processados pela plataforma Brevo (UE), que cumpre o RGPD. O alojamento do site é feito pela Hostinger, em servidores na União Europeia. As conversas de chat são processadas pela Brevo Conversations.'),
    ('Os seus direitos', 'Ao abrigo do RGPD, pode a qualquer momento pedir acesso, correção, portabilidade ou eliminação dos seus dados, bem como retirar qualquer consentimento dado. Basta escrever para {mail}. Respondemos no prazo máximo de 30 dias. Tem ainda o direito de apresentar queixa à CNPD (Comissão Nacional de Proteção de Dados).'),
    ('Quanto tempo guardamos', 'Guardamos os dados de contactos comerciais enquanto a relação estiver ativa ou até que peça a eliminação. Pedidos de Raio-X sem seguimento são eliminados ao fim de 24 meses.'),
  ],
  'secCookies': 'Política de Cookies',
  'cookies': [
    ('Cookies essenciais', 'Necessários para o funcionamento do site, como a memorização da região/idioma que escolheu na entrada e o funcionamento do chat. Não podem ser desativados, porque sem eles o site não funciona corretamente.'),
    ('Cookies de análise e marketing', 'Poderemos utilizar ferramentas como Google Analytics e Meta Pixel para perceber como o site é usado e medir campanhas. Estes cookies só são ativados com o seu consentimento, através do aviso de cookies. Pode retirar o consentimento a qualquer momento limpando os cookies do navegador ou escrevendo-nos.'),
    ('Cookies de terceiros', 'O chat (Brevo Conversations) pode definir cookies próprios para manter a conversa ativa entre páginas. Vídeos e conteúdos incorporados de terceiros podem definir cookies quando interage com eles.'),
  ],
  'secTerms': 'Termos de Utilização',
  'terms': [
    ('Âmbito', 'Estes termos aplicam-se à utilização do site criealgo.pro e ao pedido de diagnóstico Raio-X. Os serviços contratados são sempre regidos por proposta e acordo escritos, específicos para cada projeto.'),
    ('Raio-X grátis', 'O Raio-X é um diagnóstico gratuito e sem compromisso, entregue por email em até 48 horas úteis. Não constitui proposta contratual nem obriga qualquer das partes.'),
    ('Propriedade intelectual', 'Todos os conteúdos deste site, incluindo textos, ilustrações, logótipos e código, pertencem à CrieAlgo ou aos respetivos clientes e não podem ser reproduzidos sem autorização. Os logótipos de clientes e ferramentas apresentados pertencem aos respetivos titulares e são exibidos apenas como referência de portefólio ou de tecnologia utilizada.'),
    ('Limitação de responsabilidade', 'A informação deste site tem caráter informativo. A CrieAlgo não se responsabiliza por decisões tomadas exclusivamente com base no conteúdo do site ou do diagnóstico gratuito.'),
    ('Lei aplicável', 'Estes termos regem-se pela lei portuguesa. Para qualquer litígio são competentes os tribunais portugueses, sem prejuízo das normas imperativas de proteção do consumidor do país de residência do utilizador.'),
  ],
  'secConsent': 'Consentimento e contactos futuros',
  'consent': 'Quando marca a opção de receber novidades (no formulário, no chat ou por escrito), autoriza a CrieAlgo a enviar-lhe emails ocasionais sobre serviços, conteúdos e novidades. Cada email inclui sempre um link para cancelar a subscrição com um clique. Retirar o consentimento não afeta nenhum serviço em curso.',
  'urgent': 'Assunto urgente? Fale connosco no WhatsApp',
 },
 'en': {
  'lang': 'en', 'file': 'en.html',
  'title': 'Policies & Privacy · CrieAlgo',
  'home': '/en', 'homeLabel': 'Back to site',
  'updated': 'Last updated: August 7, 2026',
  'contactMail': 'contact@criealgo.pro',
  'wa': '+351912880264', 'waShow': '+351 912 880 264',
  'addr': 'Rua Prof. Manuel de Barros, 18, Esposende, Portugal',
  'h1': 'Policies, Privacy & Consent',
  'intro': 'This page explains, in plain language, how CrieAlgo handles your data, which cookies we use and the terms under which we provide our services. It applies to criealgo.pro and all its language versions.',
  'secPriv': 'Privacy Policy',
  'priv': [
    ('Who we are', 'CrieAlgo is an independent digital studio for design, web and AI, based at {addr}. For any privacy matter, write to {mail}.'),
    ('What we collect', 'We only collect the data you give us voluntarily: name, email, phone (optional), a link to your site or social profiles and your project description, through the X-Ray form, the chat or direct email. We also collect basic technical browsing data (pages visited, device type) when you accept analytics cookies.'),
    ('How we use it', 'We use your data to reply to your request, prepare the X-Ray diagnosis, deliver contracted services and, only with your explicit consent, send occasional emails about CrieAlgo services and news. We never sell or share your data with third parties for marketing purposes.'),
    ('Where it is stored', 'Contact and email marketing data is processed by Brevo (EU), which is GDPR compliant. The site is hosted by Hostinger on servers in the European Union. Chat conversations are processed by Brevo Conversations.'),
    ('Your rights', 'Under the GDPR you can request access, correction, portability or deletion of your data at any time, and withdraw any consent given. Just write to {mail}. We reply within 30 days at most. You also have the right to lodge a complaint with your local data protection authority.'),
    ('How long we keep it', 'We keep business contact data while the relationship is active or until you request deletion. X-Ray requests with no follow-up are deleted after 24 months.'),
  ],
  'secCookies': 'Cookie Policy',
  'cookies': [
    ('Essential cookies', 'Required for the site to work, such as remembering the region/language you chose at the entrance and keeping the chat running. They cannot be disabled, because the site would not work properly without them.'),
    ('Analytics and marketing cookies', 'We may use tools such as Google Analytics and Meta Pixel to understand how the site is used and measure campaigns. These cookies are only activated with your consent, through the cookie notice. You can withdraw consent at any time by clearing your browser cookies or writing to us.'),
    ('Third-party cookies', 'The chat (Brevo Conversations) may set its own cookies to keep the conversation active between pages. Embedded third-party content may set cookies when you interact with it.'),
  ],
  'secTerms': 'Terms of Use',
  'terms': [
    ('Scope', 'These terms apply to the use of criealgo.pro and to the free X-Ray request. Contracted services are always governed by a written proposal and agreement specific to each project.'),
    ('Free X-Ray', 'The X-Ray is a free, no-obligation diagnosis delivered by email within 48 business hours. It is not a contractual offer and does not bind either party.'),
    ('Intellectual property', 'All content on this site, including copy, illustrations, logos and code, belongs to CrieAlgo or its clients and may not be reproduced without permission. Client and tool logos shown belong to their respective owners and are displayed only as portfolio or technology references.'),
    ('Limitation of liability', 'The information on this site is provided for information purposes. CrieAlgo is not liable for decisions made solely on the basis of the site content or the free diagnosis.'),
    ('Governing law', 'These terms are governed by Portuguese law. Portuguese courts have jurisdiction, without prejudice to mandatory consumer protection rules of the user’s country of residence.'),
  ],
  'secConsent': 'Consent and future contact',
  'consent': 'When you tick the option to receive news (in the form, in the chat or in writing), you allow CrieAlgo to send you occasional emails about services, content and news. Every email always includes a one-click unsubscribe link. Withdrawing consent does not affect any ongoing service.',
  'urgent': 'Urgent matter? Talk to us on WhatsApp',
 },
 'es': {
  'lang': 'es', 'file': 'es.html',
  'title': 'Políticas y Privacidad · CrieAlgo',
  'home': '/es', 'homeLabel': 'Volver al sitio',
  'updated': 'Última actualización: 7 de agosto de 2026',
  'contactMail': 'contact@criealgo.pro',
  'wa': '+351912880264', 'waShow': '+351 912 880 264',
  'addr': 'Rua Prof. Manuel de Barros, 18, Esposende, Portugal',
  'h1': 'Políticas, Privacidad y Consentimiento',
  'intro': 'Esta página explica, en lenguaje claro, cómo CrieAlgo trata sus datos, qué cookies utiliza y en qué términos presta sus servicios. Se aplica a criealgo.pro y a todas sus versiones de idioma.',
  'secPriv': 'Política de Privacidad',
  'priv': [
    ('Quiénes somos', 'CrieAlgo es un estudio digital independiente de diseño, web e IA, con sede en {addr}. Para cualquier asunto de privacidad, escriba a {mail}.'),
    ('Qué datos recogemos', 'Solo recogemos los datos que usted nos entrega voluntariamente: nombre, email, teléfono (opcional), enlace de su web o redes sociales y la descripción de su proyecto, a través del formulario Rayos-X, del chat o por email directo. También recogemos datos técnicos básicos de navegación (páginas visitadas, tipo de dispositivo) cuando acepta cookies de análisis.'),
    ('Para qué los usamos', 'Usamos sus datos para responder a su solicitud, preparar el diagnóstico Rayos-X, prestar los servicios contratados y, solo con su consentimiento explícito, enviar comunicaciones ocasionales por email sobre servicios y novedades de CrieAlgo. No vendemos ni cedemos sus datos a terceros con fines de marketing.'),
    ('Dónde se guardan', 'Los datos de contacto y de email marketing son procesados por la plataforma Brevo (UE), que cumple el RGPD. El alojamiento del sitio corre a cargo de Hostinger, en servidores de la Unión Europea. Las conversaciones de chat son procesadas por Brevo Conversations.'),
    ('Sus derechos', 'En virtud del RGPD, puede solicitar en cualquier momento el acceso, la corrección, la portabilidad o la eliminación de sus datos, así como retirar cualquier consentimiento otorgado. Basta con escribir a {mail}. Respondemos en un plazo máximo de 30 días. También tiene derecho a presentar una reclamación ante su autoridad de protección de datos.'),
    ('Cuánto tiempo los guardamos', 'Guardamos los datos de contactos comerciales mientras la relación esté activa o hasta que solicite su eliminación. Las solicitudes de Rayos-X sin seguimiento se eliminan a los 24 meses.'),
  ],
  'secCookies': 'Política de Cookies',
  'cookies': [
    ('Cookies esenciales', 'Necesarias para el funcionamiento del sitio, como recordar la región/idioma elegido en la entrada y mantener el chat activo. No pueden desactivarse, porque sin ellas el sitio no funciona correctamente.'),
    ('Cookies de análisis y marketing', 'Podremos utilizar herramientas como Google Analytics y Meta Pixel para entender cómo se usa el sitio y medir campañas. Estas cookies solo se activan con su consentimiento, a través del aviso de cookies. Puede retirar el consentimiento en cualquier momento borrando las cookies del navegador o escribiéndonos.'),
    ('Cookies de terceros', 'El chat (Brevo Conversations) puede establecer cookies propias para mantener la conversación activa entre páginas. Los contenidos incrustados de terceros pueden establecer cookies cuando interactúa con ellos.'),
  ],
  'secTerms': 'Términos de Uso',
  'terms': [
    ('Ámbito', 'Estos términos se aplican al uso de criealgo.pro y a la solicitud del diagnóstico Rayos-X gratuito. Los servicios contratados se rigen siempre por propuesta y acuerdo escritos, específicos para cada proyecto.'),
    ('Rayos-X gratis', 'El Rayos-X es un diagnóstico gratuito y sin compromiso, entregado por email en un máximo de 48 horas laborables. No constituye una oferta contractual ni obliga a ninguna de las partes.'),
    ('Propiedad intelectual', 'Todos los contenidos de este sitio, incluidos textos, ilustraciones, logotipos y código, pertenecen a CrieAlgo o a sus respectivos clientes y no pueden reproducirse sin autorización. Los logotipos de clientes y herramientas mostrados pertenecen a sus respectivos titulares y se exhiben solo como referencia de portafolio o de tecnología utilizada.'),
    ('Limitación de responsabilidad', 'La información de este sitio tiene carácter informativo. CrieAlgo no se responsabiliza de decisiones tomadas exclusivamente sobre la base del contenido del sitio o del diagnóstico gratuito.'),
    ('Ley aplicable', 'Estos términos se rigen por la ley portuguesa. Son competentes los tribunales portugueses, sin perjuicio de las normas imperativas de protección del consumidor del país de residencia del usuario.'),
  ],
  'secConsent': 'Consentimiento y contactos futuros',
  'consent': 'Cuando marca la opción de recibir novedades (en el formulario, en el chat o por escrito), autoriza a CrieAlgo a enviarle emails ocasionales sobre servicios, contenidos y novedades. Cada email incluye siempre un enlace para cancelar la suscripción con un clic. Retirar el consentimiento no afecta a ningún servicio en curso.',
  'urgent': '¿Asunto urgente? Hable con nosotros por WhatsApp',
 },
 'br': {
  'lang': 'pt-BR', 'file': 'br.html',
  'title': 'Políticas e Privacidade · CrieAlgo Brasil',
  'home': '/br/', 'homeLabel': 'Voltar ao site',
  'updated': 'Última atualização: 7 de agosto de 2026',
  'contactMail': 'rafael@criealgo.com.br',
  'wa': '+5511995360430', 'waShow': '+55 11 99536-0430',
  'addr': 'Rua Pedroso Xavier, 188, São Paulo, SP, Brasil',
  'h1': 'Políticas, Privacidade e Consentimento',
  'intro': 'Esta página reúne, de forma clara e sem juridiquês desnecessário, como a CrieAlgo trata os seus dados, quais cookies utiliza e em quais termos presta os seus serviços. Aplica-se ao site criealgo.pro/br e à operação brasileira da CrieAlgo.',
  'secPriv': 'Política de Privacidade (LGPD)',
  'priv': [
    ('Quem somos', 'A CrieAlgo é um estúdio digital independente de design, web e IA, com operação no Brasil em {addr} e sede internacional em Esposende, Portugal. Para qualquer assunto de privacidade, escreva para {mail}.'),
    ('Quais dados coletamos', 'Coletamos apenas os dados que você entrega voluntariamente: nome, email, telefone (opcional), link do seu site ou redes sociais e a descrição do seu projeto, por meio do formulário Raio-X, do chat ou de contato direto por email. Também coletamos dados técnicos básicos de navegação (páginas visitadas, tipo de dispositivo) quando você aceita cookies de análise.'),
    ('Para que usamos', 'Usamos os seus dados para responder ao seu pedido, preparar o diagnóstico Raio-X, prestar os serviços contratados e, apenas com o seu consentimento explícito, enviar comunicações ocasionais por email sobre serviços e novidades da CrieAlgo. Não vendemos nem compartilhamos os seus dados com terceiros para fins de marketing.'),
    ('Onde ficam guardados', 'Os dados de contato e de email marketing são processados pela plataforma Brevo (UE), em conformidade com a LGPD e o RGPD europeu. A hospedagem do site é feita pela Hostinger, em servidores na União Europeia. As conversas de chat são processadas pela Brevo Conversations.'),
    ('Os seus direitos', 'Nos termos da LGPD (Lei 13.709/2018), você pode a qualquer momento solicitar acesso, correção, portabilidade ou eliminação dos seus dados, bem como revogar qualquer consentimento dado. Basta escrever para {mail}. Respondemos em até 15 dias. Você também pode apresentar reclamação à ANPD (Autoridade Nacional de Proteção de Dados).'),
    ('Por quanto tempo guardamos', 'Guardamos os dados de contatos comerciais enquanto a relação estiver ativa ou até que você peça a eliminação. Pedidos de Raio-X sem seguimento são eliminados após 24 meses.'),
  ],
  'secCookies': 'Política de Cookies',
  'cookies': [
    ('Cookies essenciais', 'Necessários para o funcionamento do site, como a memorização da região/idioma escolhido na entrada e o funcionamento do chat. Não podem ser desativados, porque sem eles o site não funciona corretamente.'),
    ('Cookies de análise e marketing', 'Poderemos utilizar ferramentas como Google Analytics e Meta Pixel para entender como o site é usado e medir campanhas. Esses cookies só são ativados com o seu consentimento, por meio do aviso de cookies. Você pode revogar o consentimento a qualquer momento limpando os cookies do navegador ou escrevendo para nós.'),
    ('Cookies de terceiros', 'O chat (Brevo Conversations) pode definir cookies próprios para manter a conversa ativa entre páginas. Vídeos e conteúdos incorporados de terceiros podem definir cookies quando você interage com eles.'),
  ],
  'secTerms': 'Termos de Uso',
  'terms': [
    ('Âmbito', 'Estes termos se aplicam ao uso do site criealgo.pro/br e ao pedido de diagnóstico Raio-X. Os serviços contratados são sempre regidos por proposta e acordo escritos, específicos para cada projeto.'),
    ('Raio-X grátis', 'O Raio-X é um diagnóstico gratuito e sem compromisso, entregue por email em até 48 horas úteis. Não constitui proposta contratual nem obriga qualquer das partes.'),
    ('Propriedade intelectual', 'Todos os conteúdos deste site, incluindo textos, ilustrações, logotipos e código, pertencem à CrieAlgo ou aos respectivos clientes e não podem ser reproduzidos sem autorização. Os logotipos de clientes e ferramentas apresentados pertencem aos respectivos titulares e são exibidos apenas como referência de portfólio ou de tecnologia utilizada.'),
    ('Limitação de responsabilidade', 'A informação deste site tem caráter informativo. A CrieAlgo não se responsabiliza por decisões tomadas exclusivamente com base no conteúdo do site ou do diagnóstico gratuito.'),
    ('Lei aplicável', 'Estes termos são regidos pela lei brasileira para a operação no Brasil. Para qualquer litígio é competente o foro da comarca de São Paulo, SP, sem prejuízo das normas de proteção do consumidor.'),
  ],
  'secConsent': 'Consentimento e contatos futuros',
  'consent': 'Quando você marca a opção de receber novidades (no formulário, no chat ou por escrito), autoriza a CrieAlgo a enviar emails ocasionais sobre serviços, conteúdos e novidades. Todo email inclui sempre um link para cancelar a inscrição com um clique. Revogar o consentimento não afeta nenhum serviço em andamento.',
  'urgent': 'Assunto urgente? Fale com a gente no WhatsApp',
 },
}

TPL = '''<!doctype html>
<html lang="{lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title}</title>
<meta name="robots" content="index,follow">
<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='42' fill='%2306D6A0'/%3E%3C/svg%3E">
<style>
:root {{ --ink:#0B0B0F; --verde:#06D6A0; --amarelo:#FFD166; --azul:#118AB2; }}
* {{ margin:0; padding:0; box-sizing:border-box; }}
body {{ font-family:'Helvetica Neue',Arial,sans-serif; color:var(--ink); background:#fff; line-height:1.7; -webkit-font-smoothing:antialiased; }}
.wrap {{ max-width:820px; margin:0 auto; padding:48px 24px 96px; }}
.top {{ display:flex; align-items:center; justify-content:space-between; gap:16px; margin-bottom:56px; flex-wrap:wrap; }}
.logo {{ font-weight:800; font-size:1.5rem; letter-spacing:-0.04em; text-decoration:none; color:var(--ink); }}
.logo span {{ color:var(--verde); }}
.back {{ font-size:.85rem; color:rgba(0,0,0,.55); text-decoration:none; border:1px solid rgba(0,0,0,.12); border-radius:999px; padding:8px 18px; transition:all .2s; }}
.back:hover {{ border-color:var(--ink); color:var(--ink); }}
h1 {{ font-size:clamp(1.9rem,5vw,2.8rem); letter-spacing:-0.03em; line-height:1.1; margin-bottom:12px; }}
.updated {{ font-size:.8rem; color:rgba(0,0,0,.45); margin-bottom:28px; }}
.intro {{ font-size:1.05rem; color:rgba(0,0,0,.7); margin-bottom:48px; }}
.toc {{ display:flex; gap:10px; flex-wrap:wrap; margin-bottom:56px; }}
.toc a {{ font-size:.8rem; font-weight:600; text-decoration:none; color:var(--ink); border-radius:999px; padding:8px 16px; border:1px solid rgba(0,0,0,.1); }}
.toc a:nth-child(1) {{ background:rgba(6,214,160,.12); border-color:rgba(6,214,160,.4); }}
.toc a:nth-child(2) {{ background:rgba(255,209,102,.16); border-color:rgba(255,209,102,.5); }}
.toc a:nth-child(3) {{ background:rgba(17,138,178,.1); border-color:rgba(17,138,178,.35); }}
.toc a:nth-child(4) {{ background:rgba(239,71,111,.08); border-color:rgba(239,71,111,.3); }}
h2 {{ font-size:1.5rem; letter-spacing:-0.02em; margin:64px 0 8px; padding-top:24px; border-top:1px solid rgba(0,0,0,.07); }}
h2 .dot {{ display:inline-block; width:10px; height:10px; border-radius:50%; margin-right:10px; }}
h3 {{ font-size:1.02rem; margin:28px 0 6px; }}
p {{ font-size:.95rem; color:rgba(0,0,0,.68); }}
a.mail {{ color:var(--azul); }}
.urgent {{ margin-top:72px; text-align:center; background:#0B0B0F; border-radius:24px; padding:40px 24px; }}
.urgent p {{ color:rgba(255,255,255,.8); margin-bottom:18px; font-size:1rem; }}
.urgent a {{ display:inline-block; background:#25D366; color:#fff; font-weight:700; text-decoration:none; border-radius:999px; padding:14px 32px; font-size:.95rem; }}
footer {{ margin-top:64px; font-size:.78rem; color:rgba(0,0,0,.4); text-align:center; }}
</style>
</head>
<body>
<div class="wrap">
  <div class="top">
    <a class="logo" href="{home}">criealgo<span>.</span></a>
    <a class="back" href="{home}">{homeLabel}</a>
  </div>
  <h1>{h1}</h1>
  <p class="updated">{updated}</p>
  <p class="intro">{intro}</p>
  <nav class="toc">
    <a href="#privacidade">{secPriv}</a>
    <a href="#cookies">{secCookies}</a>
    <a href="#termos">{secTerms}</a>
    <a href="#consentimento">{secConsent}</a>
  </nav>

  <h2 id="privacidade"><span class="dot" style="background:var(--verde)"></span>{secPriv}</h2>
  {privHtml}

  <h2 id="cookies"><span class="dot" style="background:var(--amarelo)"></span>{secCookies}</h2>
  {cookiesHtml}

  <h2 id="termos"><span class="dot" style="background:var(--azul)"></span>{secTerms}</h2>
  {termsHtml}

  <h2 id="consentimento"><span class="dot" style="background:#EF476F"></span>{secConsent}</h2>
  <p style="margin-top:12px">{consent}</p>

  <div class="urgent">
    <p>{urgent}</p>
    <a href="https://wa.me/{waNum}" rel="noopener">WhatsApp {waShow}</a>
  </div>

  <footer>CrieAlgo · {addr} · <a class="mail" href="mailto:{contactMail}">{contactMail}</a></footer>
</div>
</body>
</html>
'''

def sec_html(items, d):
    out = []
    for h, p in items:
        p = p.replace('{addr}', d['addr']).replace('{mail}', '<a class="mail" href="mailto:%s">%s</a>' % (d['contactMail'], d['contactMail']))
        out.append('<h3>%s</h3>\n<p>%s</p>' % (h, p))
    return '\n  '.join(out)

os.makedirs(OUT, exist_ok=True)
for key, d in DATA.items():
    html = TPL.format(
        lang=d['lang'], title=d['title'], home=d['home'], homeLabel=d['homeLabel'],
        h1=d['h1'], updated=d['updated'], intro=d['intro'],
        secPriv=d['secPriv'], secCookies=d['secCookies'], secTerms=d['secTerms'], secConsent=d['secConsent'],
        privHtml=sec_html(d['priv'], d), cookiesHtml=sec_html(d['cookies'], d), termsHtml=sec_html(d['terms'], d),
        consent=d['consent'], urgent=d['urgent'], waNum=d['wa'].replace('+',''), waShow=d['waShow'],
        addr=d['addr'], contactMail=d['contactMail'],
    )
    with open(os.path.join(OUT, d['file']), 'w') as f:
        f.write(html)
    print('wrote', d['file'], len(html))
