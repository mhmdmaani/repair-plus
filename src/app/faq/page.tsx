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
    </Container>
  );
};

export default FAQ;
