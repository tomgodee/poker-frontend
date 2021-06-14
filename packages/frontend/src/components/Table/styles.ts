import styled from 'styled-components';
import {
  Button,
  Input,
  Typography,
} from '@material-ui/core';
import { mintCream, salmon, prussianBlue } from '../../themes/colors';

export const TableContainer = styled.div`
  position: relative;
  display: flex;
  width: 75%;
  height: 500px;
  border: 12px solid ${salmon};
  border-radius: 50%;
  background-color: ${prussianBlue};
`;

export const TableTitle = styled(Typography)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-transform: uppercase;
  font-style: italic;
  font-size: 3rem;
  opacity: 0.35;
  color: ${mintCream};
` as typeof Typography;
