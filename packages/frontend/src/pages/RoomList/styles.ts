import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import Skeleton from '@material-ui/lab/Skeleton';
import { gray, green, white } from '../../themes/colors';

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

export const RoomContainer = styled(Card)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 46%;
  margin: 1%;
  height: 250px;
  border: 1px solid ${gray};
  border-radius: 10px;
  box-shadow:none;
  @media (min-width: 960px) {
    width: 22.5%;
    margin: 1%;
  }

  .MuiCardMedia-media {
    width: unset;
  }
  .MuiCardContent-root {
    border-top:  1px solid #0F2027;
    background: #0F2027;
    background: -webkit-linear-gradient(to right,#2C5364,#203A43,#0F2027);
    background: linear-gradient(to right,#2C5364,#203A43,#0F2027);
  }

  .MuiTypography-root {
    color :${white};
  }
`;

export const RoomSkeleton = styled(Skeleton)`
  width: 46%;
  margin: 2%;
  height: 250px;
  @media (min-width: 960px) {
    width: 23%;
    margin: 1%;
  }
`;
