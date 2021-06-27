import React from 'react';
import {
  TablePotContainer,
  PotAmount,
  ChipStackContainer,
  ChipStack,
  Chip,
  ChipInnerRing,
  ChipNumber,
} from './styles';

interface TablePotInterface {
  amount: number;
}

const TablePot = (props: TablePotInterface) => {
  const calculateChipsQuantity = (amount: number): number[][] => {
    let chipValue = amount;
    if (chipValue === 0) return [];
    const numberLength = String(chipValue).length;
    const quantity: number[][] = new Array([]);
    for (let i = 0; i < numberLength; i += 1) {
      quantity[i] = [];
      for (let j = 0; j < Math.floor(chipValue / 10 ** (numberLength - i - 1)); j += 1) {
        quantity[i].push(j);
      }
      chipValue %= (10 ** (numberLength - i - 1));
    }
    return quantity;
  };

  const getChipNumber = (value: number): string => {
    switch (value) {
      case 1:
        return '1';
      case 2:
        return '10';
      case 3:
        return '100';
      case 4:
        return '1K';
      case 5:
        return '10K';
      case 6:
        return '100K';
      default:
        return `${10 ** (value - 1)}`;
    }
  };

  return (
    <TablePotContainer>
      <PotAmount>
        {props.amount}
      </PotAmount>
      <ChipStackContainer>
        {calculateChipsQuantity(props.amount).map((quantities: number[], index, chips) => {
          return (
            // eslint-disable-next-line react/no-array-index-key
            <ChipStack key={`${quantities[0]}-${index}`}>
              {
                quantities.map((quantity: number) => {
                  return (
                    <Chip key={quantity} top={quantity}>
                      <ChipInnerRing>
                        <ChipNumber>
                          {getChipNumber(chips.length - index)}
                        </ChipNumber>
                      </ChipInnerRing>
                    </Chip>
                  );
                })
              }
            </ChipStack>
          );
        })}
      </ChipStackContainer>
    </TablePotContainer>
  );
};

export default TablePot;
