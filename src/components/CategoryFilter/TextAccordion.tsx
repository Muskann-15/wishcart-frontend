import { Accordion, AccordionDetails, AccordionSummary, Checkbox, FormControlLabel, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styles from './categoryFilter.module.scss';
import type { ExpandedAccordionsType } from '../../type/product';

interface TextAccordionProps {
  handleCheckboxChange: (filterType: keyof ExpandedAccordionsType, value: string, checked: boolean) => void;
  expandedAccordions: ExpandedAccordionsType;
  handleAccordionChange: (panel: keyof ExpandedAccordionsType) => (event: React.SyntheticEvent, isExpanded: boolean) => void;
  isChecked: (filterType: keyof ExpandedAccordionsType, value: string) => boolean;
  data: string[];
  title: string;
  filterType: keyof ExpandedAccordionsType;
}

const TextAccordion: React.FC<TextAccordionProps> = ({
  handleCheckboxChange,
  expandedAccordions,
  handleAccordionChange,
  isChecked,
  data,
  title,
  filterType
}) => {
  return (
    <Accordion expanded={expandedAccordions[filterType]} onChange={handleAccordionChange(filterType)} className={styles.filterAccordion}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {data.map((filterValue) => (
          <FormControlLabel
            key={filterValue}
            control={
              <Checkbox
                checked={isChecked(filterType, filterValue)}
                onChange={(e) => handleCheckboxChange(filterType, filterValue, e.target.checked)}
              />
            }
            label={filterValue}
            className={styles.filterCheckbox}
          />
        ))}
      </AccordionDetails>
    </Accordion>
  )
}

export default TextAccordion;