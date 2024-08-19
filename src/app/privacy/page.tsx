import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Repair Plus | Privacy Policy',
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

const Integritetspolicy = () => {
  return (
    <div className='integritetspolicy'>
      <h1>Integritetspolicy</h1>
      <p>Senast uppdaterad: 19 augusti 2024</p>

      <h2>Introduktion</h2>
      <p>
        På Repair Plus värnar vi om din integritet. Denna integritetspolicy
        ("Policy") beskriver hur vi samlar in, använder, och skyddar dina
        personuppgifter när du besöker vår webbplats, repairplus.se
        ("Webbplatsen"), eller använder våra tjänster.
      </p>

      <h2>Vilka uppgifter vi samlar in</h2>
      <h3>Personuppgifter</h3>
      <p>Vi kan samla in följande personuppgifter från dig:</p>
      <ul>
        <li>Namn</li>
        <li>Kontaktinformation, inklusive e-postadress och telefonnummer</li>
        <li>Betalningsinformation</li>
        <li>Leveransadress</li>
        <li>Enhetsinformation (IP-adress, webbläsartyp, etc.)</li>
      </ul>

      <h3>Icke-personlig information</h3>
      <p>
        Vi kan också samla in icke-personlig information, såsom statistik över
        hur du använder Webbplatsen, för att förbättra våra tjänster.
      </p>

      <h2>Hur vi använder dina uppgifter</h2>
      <p>Vi använder dina personuppgifter för följande ändamål:</p>
      <ul>
        <li>
          För att tillhandahålla och hantera våra tjänster, inklusive
          reparation, köp och försäljning av elektronik.
        </li>
        <li>För att behandla betalningar och hantera beställningar.</li>
        <li>
          För att kommunicera med dig om dina beställningar, tjänster och
          support.
        </li>
        <li>För att förbättra våra tjänster och Webbplatsen.</li>
        <li>För att följa lagkrav och regler.</li>
      </ul>

      <h2>Hur vi skyddar dina uppgifter</h2>
      <p>
        Vi vidtar rimliga säkerhetsåtgärder för att skydda dina personuppgifter
        mot obehörig åtkomst, förändring, avslöjande eller förstörelse. Men kom
        ihåg att ingen metod för överföring över internet eller metod för
        elektronisk lagring är 100% säker.
      </p>

      <h2>Delning av dina uppgifter</h2>
      <p>
        Vi delar inte dina personuppgifter med tredje part, utom i följande
        fall:
      </p>
      <ul>
        <li>Med ditt samtycke.</li>
        <li>
          För att uppfylla lagliga skyldigheter eller svara på rättsliga
          förfrågningar.
        </li>
        <li>
          Med tjänsteleverantörer som hjälper oss att tillhandahålla våra
          tjänster, under förutsättning att de följer denna Policy och andra
          lämpliga sekretess- och säkerhetsåtgärder.
        </li>
        <li>
          I samband med en företagsfusion, förvärv eller försäljning av
          tillgångar.
        </li>
      </ul>

      <h2>Dina rättigheter</h2>
      <p>Du har rätt att:</p>
      <ul>
        <li>Begära tillgång till de personuppgifter vi har om dig.</li>
        <li>Begära rättelse av felaktiga eller ofullständiga uppgifter.</li>
        <li>
          Begära att dina uppgifter raderas (med vissa undantag enligt lag).
        </li>
        <li>
          Invända mot behandlingen av dina uppgifter för direktmarknadsföring.
        </li>
        <li>Begära att behandlingen av dina uppgifter begränsas.</li>
        <li>
          Få dina uppgifter överförda till en annan tjänsteleverantör
          (dataportabilitet).
        </li>
      </ul>

      <h2>Cookies</h2>
      <p>
        Vi använder cookies och liknande tekniker för att förbättra din
        upplevelse på Webbplatsen. Genom att använda Webbplatsen godkänner du
        vår användning av cookies i enlighet med vår cookiepolicy.
      </p>

      <h2>Länkar till tredje parts webbplatser</h2>
      <p>
        Vår Webbplats kan innehålla länkar till tredjepartswebbplatser. Vi
        ansvarar inte för integritetspraxis eller innehållet på dessa
        webbplatser. Vi rekommenderar att du läser integritetspolicyn för varje
        webbplats du besöker.
      </p>

      <h2>Ändringar av denna Policy</h2>
      <p>
        Repair Plus förbehåller sig rätten att uppdatera denna Policy när som
        helst. Eventuella ändringar träder i kraft omedelbart efter att de
        publicerats på Webbplatsen. Din fortsatta användning av våra tjänster
        efter sådana ändringar innebär att du accepterar den uppdaterade
        policyn.
      </p>

      <h2>Kontakta oss</h2>
      <p>
        Om du har några frågor om denna integritetspolicy, vänligen kontakta oss
        på <a href='mailto:info@repairplus.se'>info@repairplus.se</a>.
      </p>
    </div>
  );
};

export default Integritetspolicy;
