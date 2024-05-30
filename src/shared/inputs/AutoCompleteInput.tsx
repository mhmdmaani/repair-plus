import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import * as React from 'react';

const options = ['Option 1', 'Option 2'];

export default function AutoCompleteInput({
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
  return (
    <div>
      <Autocomplete
        value={value}
        onChange={(event: any, newValue: string | null) => {
          onSelectSuggesstion(newValue);
        }}
        inputValue={value}
        onInputChange={(event: any, newInputValue) => {
          onChange(event);
        }}
        id='controllable-states-demo'
        options={suggestions}
        renderInput={(params) => <TextField {...params} label='Controllable' />}
      />
    </div>
  );
}
