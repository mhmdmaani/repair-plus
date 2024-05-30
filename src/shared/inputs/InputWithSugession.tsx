'use client';
import {
  Card,
  InputAdornment,
  List,
  ListItemButton,
  ListItemText,
  TextField,
  Typography,
  styled,
} from '@mui/material';
import { useState } from 'react';

const Container = styled('div')`
  position: relative;
`;
const IconContainer = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) =>
    props.theme.palette.mode === 'dark'
      ? props.theme.palette.common.white
      : props.theme.palette.common.black};
  font-size: 20px;
  @media (max-width: 600px) {
    font-size: 16px;
  }
`;

const Input = styled(TextField)`
  background-color:transparent;
  color: ${(props) =>
    props.theme.palette.mode === 'dark'
      ? props.theme.palette.common.white
      : props.theme.palette.common.black};
  font-size: 16px;
  font-family:'Rajdhani', 'Poppins', sans-serif;
  border-radius: ${(props) => props.theme.shape.borderRadius}px;
  margin: 10px 0;
  width: 100%;
  outline: none;
  transition: all 0.3s ease-in-out;
  @media (max-width: 600px) {
     font-size: 14px;
     margin: 5px 0;
`;

const SuggestionContainer = styled(Card)<{ isExpanded: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: ${(props) => props.theme.palette.background.paper};
  border-top: none;
  border-radius: 0 0 12px 12px;
  padding: 10px;
  width: 100%;
  height: ${(props) => (props.isExpanded ? '300px' : '0')};
  opacity: ${(props) => (props.isExpanded ? '1' : '0')};
  transition: all 0.3s ease-in-out;
  overflow-y: auto;
  z-index: 10;
  @media (max-width: 1000px) {
    max-height: 200px;
    padding: 5px;
  }
`;

const CustomListItemText = styled(ListItemText)`
  font-size: 14px;
  font-weight: bold;
`;

export default function InputWithSugession({
  value,
  onChange,
  suggestions,
  onSelectSuggesstion,
  icon,
  ...props
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  suggestions: any[];
  onSelectSuggesstion: (suggestion: any) => void;
  icon?: React.ReactNode;
  [key: string]: any;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <Container>
      <Input
        type='search'
        value={value}
        onChange={onChange}
        onFocus={() => setIsExpanded(true)}
        onBlur={() => setIsExpanded(false)}
        label={props?.placeholder}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <IconContainer>{icon}</IconContainer>
            </InputAdornment>
          ),
        }}
        {...props}
      />

      <SuggestionContainer isExpanded={isExpanded}>
        <List>
          {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            suggestions.map((suggestion, index) => (
              <ListItemButton
                onClick={() => onSelectSuggesstion(suggestion)}
                key={index}
              >
                <Typography variant='caption'>
                  {suggestion.description}
                </Typography>
              </ListItemButton>
            ))
          }
        </List>
      </SuggestionContainer>
    </Container>
  );
}
