
// Définition des couleurs thématiques de Vita Mora
// Ces couleurs sont utilisées dans tout le projet pour assurer une cohérence visuelle

export const vitamoraColors = {
  // Couleurs principales
  green: "#2E8B57", // Vert principal du logo
  orange: "#FF7F50", // Orange pour les accents et les boutons d'action
  cream: "#FFF8E1", // Couleur de fond claire et chaleureuse
  
  // Nuances secondaires
  lightGreen: "#8FBC8F", // Pour les hover et les éléments secondaires
  darkGreen: "#1F6342", // Pour les textes et éléments importants
  lightOrange: "#FFAF7A", // Pour les hover sur éléments oranges
  
  // Couleurs neutres
  black: "#333333", // Pour les textes principaux
  gray: "#6B7280", // Pour les textes secondaires
  lightGray: "#F3F4F6" // Pour les backgrounds secondaires
};

// Fonction pour obtenir une variable CSS pour les couleurs Tailwind
export const getVitamoraColor = (colorName: keyof typeof vitamoraColors) => {
  return vitamoraColors[colorName];
};

// Exposition des tailles d'écran pour les media queries
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

// Theme object pour l'utilisation avec Context si nécessaire
export const vitamoraTheme = {
  colors: vitamoraColors,
  breakpoints,
  fonts: {
    body: 'system-ui, sans-serif',
    heading: 'system-ui, sans-serif',
  },
  fontWeights: {
    normal: 400,
    medium: 500,
    bold: 700,
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    full: '9999px',
  },
};

export default vitamoraTheme;
