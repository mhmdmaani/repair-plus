export const clientContact = (clientName: string) => `
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
            <td>
                <h2 style="color: #0056b3;">Tack för att du kontaktade oss – Vi återkommer snart!</h2>
                <p>Kära ${clientName},</p>
                <p>Tack för att du kontaktade oss! Vi har mottagit ditt meddelande och uppskattar att du tog dig tid att nå ut till oss.</p>
                <p>Vårt team granskar just nu din förfrågan, och vi kommer att återkomma till dig så snart som möjligt. Du kan förvänta dig ett svar inom [timeframe, e.g., 24-48 timmar].</p>
                <p>Om ditt ärende är brådskande, är du välkommen att ringa oss direkt på <a href="tel:0046701414101" style="color: #0056b3;">0046701414101</a>.</p>
                <p>Vi ser fram emot att hjälpa dig!</p>
                <p>Med vänliga hälsningar,</p>
                <p>
                    <strong>RepairPlus</strong><br>
                    <a href="mailto:info@repairplus.se" style="color: #0056b3;">info@repairplus.se</a><br>
                    <a href="tel:0046701414101" style="color: #0056b3;">0046701414101</a><br>
                    <a href="https://www.repairplus.se" style="color: #0056b3;">repairplus.se</a>
                </p>
            </td>
        </tr>
    </table>
`;
