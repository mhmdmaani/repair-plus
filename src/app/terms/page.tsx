import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Repair Plus | Terms and Conditions',
  description:
    'RepairPlus.se offers professional and fast repair services for mobile phones, tablets, laptops, and other electronic devices. Our expert technicians provide reliable fixes for all major brands, ensuring your gadgets are back in perfect working order. Convenient, affordable, and trusted across Sweden.',
  keywords:
    'repair, mobile, phone, tablet, laptop, electronic, device, fix, service, Sweden, Trollhättan, Vänersborg, Uddevalla, Skövde, Borås, Gothenburg, Alingsås',
  icons: [
    {
      url: '/favicon.ico',
      sizes: 'any',
    },
  ],
};

const Villkor = () => {
  return (
    <div className='villkor'>
      <h1>Villkor</h1>
      <p>Senast uppdaterad: 19 augusti 2024</p>

      <h2>Introduktion</h2>
      <p>
        Välkommen till Repair Plus! Dessa villkor ("Villkor") styr din
        användning av våra tjänster, inklusive reparation, köp och försäljning
        av elektronik via vår webbplats, repairplus.se ("Webbplatsen"). Genom
        att få åtkomst till eller använda våra tjänster godkänner du att vara
        bunden av dessa villkor.
      </p>

      <h2>Tjänster</h2>
      <h3>Reparationstjänster</h3>
      <p>
        Repair Plus erbjuder reparationstjänster för olika typer av elektronik,
        inklusive men inte begränsat till smartphones, surfplattor, bärbara
        datorer och andra elektroniska enheter. Alla reparationer är beroende av
        tillgänglighet av delar och teknisk expertis.
      </p>
      <h3>Köp- och säljstjänster</h3>
      <p>
        Repair Plus underlättar också köp och försäljning av elektronik. Alla
        transaktioner är föremål för utvärdering och godkännande av vårt team.
      </p>

      <h2>Behörighet</h2>
      <p>
        Du måste vara minst 18 år gammal för att använda våra tjänster. Genom
        att godkänna dessa villkor intygar du att du är minst 18 år gammal.
      </p>

      <h2>Användning av Webbplatsen</h2>
      <p>
        När du använder vår Webbplats godkänner du att följa alla tillämpliga
        lagar och förordningar. Du godkänner också att inte delta i någon av
        följande förbjudna aktiviteter:
      </p>
      <ul>
        <li>
          Använda Webbplatsen för något olagligt ändamål eller för att uppmana
          andra att utföra olagliga aktiviteter.
        </li>
        <li>Försöka störa säkerheten eller integriteten på Webbplatsen.</li>
        <li>Lämna falsk eller vilseledande information.</li>
        <li>
          Använda något automatiserat system för att få åtkomst till Webbplatsen
          utan uttryckligt tillstånd.
        </li>
      </ul>

      <h2>Betalningar och Avgifter</h2>
      <p>
        Alla betalningar för utförda tjänster måste göras genom de
        betalningsmetoder som anges på vår Webbplats. Repair Plus förbehåller
        sig rätten att ändra priserna för tjänster när som helst utan föregående
        meddelande.
      </p>

      <h2>Garantier och Friskrivningar</h2>
      <p>
        Repair Plus tillhandahåller en begränsad garanti på reparationer, som
        täcker den specifika reparationen som utförts under en period av 90
        dagar. Denna garanti täcker inte efterföljande eller orelaterade skador.
        All elektronik som säljs av Repair Plus omfattas av en 30-dagars
        returpolicy, under förutsättning att vår utvärdering godkänner det.
      </p>
      <p>
        Repair Plus frånsäger sig alla garantier utöver denna garanti, inklusive
        eventuella underförstådda garantier om säljbarhet eller lämplighet för
        ett visst ändamål.
      </p>

      <h2>Ansvar</h2>
      <p>
        I största möjliga utsträckning som lagen tillåter, ska Repair Plus inte
        vara ansvarigt för några indirekta, tillfälliga, särskilda eller
        följdskador som uppstår ur eller i samband med våra tjänster eller dessa
        villkor.
      </p>

      <h2>Gällande Lag</h2>
      <p>
        Dessa Villkor ska regleras av och tolkas i enlighet med svensk lag.
        Eventuella tvister som uppstår ur dessa Villkor eller din användning av
        våra tjänster ska lösas exklusivt i svensk domstol.
      </p>

      <h2>Ändringar av Villkoren</h2>
      <p>
        Repair Plus förbehåller sig rätten att ändra dessa Villkor när som
        helst. Eventuella ändringar träder i kraft omedelbart efter att de
        publicerats på Webbplatsen. Din fortsatta användning av våra tjänster
        efter sådana ändringar innebär att du accepterar de nya Villkoren.
      </p>

      <h2>Kontakta Oss</h2>
      <p>
        Om du har några frågor om dessa Villkor, vänligen kontakta oss på{' '}
        <a href='mailto:info@repairplus.se'>info@repairplus.se</a>.
      </p>
    </div>
  );
};

export default Villkor;
