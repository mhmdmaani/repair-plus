'use client';
import EmailForm from '@/modules/CreateQuote/EmailForm';
import MainCreateQuote from '@/modules/CreateQuote/MainCreateQuote';
import PagesSlider from '@/shared/views/PagesSlider';
import { styled, useMediaQuery } from '@mui/material';
import React, { useEffect } from 'react';
import MainConfirmQuotePage from '../confirmQuote/MainConfirmQuotePage';

const PgContainer = styled('div')<{
  background?: string;
}>`
  width: 100%;
  height: 100%;
`;
export default function QuoteProcess({
  truckTypes,
  settings,
}: {
  truckTypes: any;
  settings: any;
}) {
  const [currentPage, setCurrentPage] = React.useState(0);
  const isMatched = useMediaQuery('(max-width: 600px)');
  const onSubmitEmail = () => {
    setCurrentPage(1);
  };

  const onCreateQuote = () => {
    setCurrentPage(2);
  };

  useEffect(() => {
    setCurrentPage(settings?.displayEmailInSeperatePage === true ? 0 : 1);
  }, [settings?.displayEmailInSeperatePage]);

  if (!settings || settings === null || !truckTypes) return null;
  return (
    <>
      <PagesSlider
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        height={'100vh'}
      >
        <PgContainer>
          <EmailForm onSubmit={onSubmitEmail} settings={settings} />
        </PgContainer>
        <PgContainer>
          <MainCreateQuote
            truckTypes={truckTypes}
            settings={settings}
            onSubmit={onCreateQuote}
          />
        </PgContainer>

        <PgContainer>
          {currentPage === 2 && (
            <MainConfirmQuotePage truckTypes={truckTypes} settings={settings} />
          )}
        </PgContainer>
      </PagesSlider>
    </>
  );
}
