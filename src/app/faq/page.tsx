// Importing React and Material UI components
import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Container,
} from '@mui/material';
import { MdExpandMore } from 'react-icons/md';

const FAQ = () => {
  return (
    <Container sx={{ marginTop: 0, paddingTop: 20 }}>
      <Typography variant='h4' gutterBottom>
        Repair Plus - Vanliga Frågor
      </Typography>

      {/* FAQ 1 */}
      <Accordion>
        <AccordionSummary expandIcon={<MdExpandMore />}>
          <Typography>Vilka typer av elektronik reparerar ni?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Vi reparerar ett brett utbud av elektronik, inklusive smartphones,
            bärbara datorer, surfplattor, spelkonsoler och mer.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* FAQ 2 */}
      <Accordion>
        <AccordionSummary expandIcon={<MdExpandMore />}>
          <Typography>Hur lång tid tar reparationen?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Tiden för reparation varierar beroende på komplexiteten i problemet.
            Enkla reparationer som skärmbyten kan ta några timmar, medan mer
            komplexa reparationer kan ta några dagar.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* FAQ 3 */}
      <Accordion>
        <AccordionSummary expandIcon={<MdExpandMore />}>
          <Typography>Erbjuder ni garanti för era reparationer?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Ja, vi erbjuder en 3-månaders garanti på alla reparationer. Om
            problemet återkommer under denna period, åtgärdar vi det
            kostnadsfritt.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* FAQ 4 */}
      <Accordion>
        <AccordionSummary expandIcon={<MdExpandMore />}>
          <Typography>Behöver jag boka tid för en reparation?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Även om det inte krävs någon tidsbokning rekommenderar vi att boka
            en tid för snabbare service. Vi tar även emot drop-in-kunder.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* FAQ 5 */}
      <Accordion>
        <AccordionSummary expandIcon={<MdExpandMore />}>
          <Typography>Kan jag få en offert innan reparationen?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Absolut! Vi erbjuder gratis diagnostik och ger dig en detaljerad
            offert innan vi påbörjar några reparationer.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* FAQ 6 */}
      <Accordion>
        <AccordionSummary expandIcon={<MdExpandMore />}>
          <Typography>Vad kostar en reparation vanligtvis?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Kostnaden för en reparation varierar beroende på typen av skada och
            vilken enhet det gäller. Vi ger dig alltid en exakt offert innan vi
            påbörjar reparationen.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* FAQ 7 */}
      <Accordion>
        <AccordionSummary expandIcon={<MdExpandMore />}>
          <Typography>
            Kommer mina data att raderas under reparationen?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Vi försöker alltid att bevara dina data, men vid vissa reparationer,
            som programvaruåterställningar eller byte av vissa komponenter, kan
            data gå förlorade. Vi rekommenderar alltid att göra en
            säkerhetskopia innan du lämnar in din enhet.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* FAQ 8 */}
      <Accordion>
        <AccordionSummary expandIcon={<MdExpandMore />}>
          <Typography>Reparerar ni vattenskadade enheter?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Ja, vi reparerar vattenskadade enheter. Vi genomför en diagnos för
            att bedöma skadan och ger dig en offert på vad som behövs för att
            fixa problemet.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* FAQ 9 */}
      <Accordion>
        <AccordionSummary expandIcon={<MdExpandMore />}>
          <Typography>Kan jag följa statusen på min reparation?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Ja, vi erbjuder ett spårningssystem där du kan följa din reparation
            i realtid. Vi meddelar dig även via SMS eller e-post när
            reparationen är klar.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* FAQ 10 */}
      <Accordion>
        <AccordionSummary expandIcon={<MdExpandMore />}>
          <Typography>Vad händer om min enhet inte kan repareras?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Om vi inte kan reparera din enhet kommer vi att meddela dig och
            diskutera andra möjliga alternativ, inklusive byte eller
            återvinning. Ingen avgift tas ut för tjänster som inte kan utföras.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* FAQ 11 */}
      <Accordion>
        <AccordionSummary expandIcon={<MdExpandMore />}>
          <Typography>Erbjuder ni expressreparationer?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Ja, vi erbjuder expressreparationer för vissa tjänster, såsom
            skärmbyten och batteribyten. Dessa reparationer kan ofta slutföras
            samma dag.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* FAQ 12 */}
      <Accordion>
        <AccordionSummary expandIcon={<MdExpandMore />}>
          <Typography>Kan jag skicka in min enhet för reparation?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Ja, vi erbjuder postservice för reparationer. Skicka in din enhet,
            och vi skickar tillbaka den när reparationen är klar.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* FAQ 13 */}
      <Accordion>
        <AccordionSummary expandIcon={<MdExpandMore />}>
          <Typography>Tar ni ut en avgift för diagnos?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nej, diagnosen är gratis. Vi undersöker din enhet och ger dig en
            offert innan vi påbörjar någon reparation.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* FAQ 14 */}
      <Accordion>
        <AccordionSummary expandIcon={<MdExpandMore />}>
          <Typography>Vilka betalningsmetoder accepterar ni?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Vi accepterar betalning via kort, kontanter, Swish och
            banköverföring. Alla betalningar sker när reparationen är avslutad
            och godkänd.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* FAQ 15 */}
      <Accordion>
        <AccordionSummary expandIcon={<MdExpandMore />}>
          <Typography>Kan ni reparera äldre elektronikmodeller?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Ja, vi reparerar även äldre elektronikmodeller. Vänligen kontakta
            oss med modellens specifikationer för att bekräfta om vi kan
            reparera den.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* FAQ 16 */}
      <Accordion>
        <AccordionSummary expandIcon={<MdExpandMore />}>
          <Typography>
            Vad händer om min enhet får fler problem efter reparationen?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Om ett nytt problem uppstår inom vår garantiperiod kommer vi att
            åtgärda det utan kostnad, så länge det är relaterat till den
            ursprungliga reparationen.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* FAQ 17 */}
      <Accordion>
        <AccordionSummary expandIcon={<MdExpandMore />}>
          <Typography>Accepterar ni företagskunder?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Ja, vi arbetar med både privatpersoner och företagskunder. Om du är
            ett företag kan vi erbjuda specialiserade lösningar och serviceavtal
            för dina elektronikbehov.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* FAQ 18 */}
      <Accordion>
        <AccordionSummary expandIcon={<MdExpandMore />}>
          <Typography>
            Finns det någon rabatt för större reparationer eller flera enheter?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Ja, vi erbjuder rabatter för större reparationer eller när du har
            flera enheter som behöver repareras. Kontakta oss för att diskutera
            detaljerna.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Container>
  );
};

export default FAQ;
