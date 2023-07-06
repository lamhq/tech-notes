# Localization

```tsx
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { zhCN } from '@mui/material/locale';

const theme = createTheme({...}, zhCN);

<ThemeProvider theme={theme}>
  <App />
</ThemeProvider>;
```