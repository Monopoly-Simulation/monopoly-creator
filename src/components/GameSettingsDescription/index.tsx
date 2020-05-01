import React, { useState, useEffect } from 'react';
import { Descriptions } from 'antd';
import { Game, BaseProps } from '@/types';
import { emptyGame } from '@/constants';
import db from '@/database';

interface GameSettingsDescriptionProps extends BaseProps {
  uid: string;
}

const GameSettingsDescription: React.FC<GameSettingsDescriptionProps> = ({ className, uid }) => {
  const [settings, setSettings] = useState<Game>(emptyGame);
  useEffect(() => {
    (async () => {
      const { gameSettings } = await db.getJob(uid);
      setSettings(gameSettings);
    })();
  }, [uid]);
  const createRangeDescription = (g: Game) => {
    let rangeParam = '';
    let step = 0;
    let stepNumber = 0;
    const {
      incomeStep,
      incomeStepNumber,
      initialFundingStep,
      initialFundingStepNumber,
      taxStep,
      taxStepNumber,
      propertyTaxStep,
      propertyTaxStepNumber,
    } = g;
    if (incomeStep && incomeStepNumber) {
      rangeParam = 'Salary';
      step = incomeStep;
      stepNumber = incomeStepNumber;
    } else if (initialFundingStep && initialFundingStepNumber) {
      rangeParam = 'Initial funding';
      step = initialFundingStep;
      stepNumber = initialFundingStepNumber;
    } else if (taxStep && taxStepNumber) {
      rangeParam = 'Tax';
      step = taxStep;
      stepNumber = taxStepNumber;
    } else if (propertyTaxStep && propertyTaxStepNumber) {
      rangeParam = 'Property tax';
      step = propertyTaxStep;
      stepNumber = propertyTaxStepNumber;
    }
    if (!rangeParam) {
      return null;
    }
    return (
      <>
        <Descriptions.Item label="Range parameter">{rangeParam}</Descriptions.Item>
        <Descriptions.Item label="Step">{step}</Descriptions.Item>
        <Descriptions.Item label="Step number">{stepNumber}</Descriptions.Item>
      </>
    );
  }
  const { game, player, round, income, tax, propertyTax, initialFunding } = settings;
  return (
    <Descriptions className={className} title="Game settings" bordered>
      <Descriptions.Item label="Number of games">{game}</Descriptions.Item>
      <Descriptions.Item label="Number of players">{player}</Descriptions.Item>
      <Descriptions.Item label="Maximum round limit">{round}</Descriptions.Item>
      <Descriptions.Item label="Salary">{income}</Descriptions.Item>
      <Descriptions.Item label="Tax">{tax}%</Descriptions.Item>
      <Descriptions.Item label="Property tax">{propertyTax}%</Descriptions.Item>
      <Descriptions.Item label="Initial funding">{initialFunding}</Descriptions.Item>
      {createRangeDescription(settings)}
    </Descriptions>
  )
}

export default GameSettingsDescription;
