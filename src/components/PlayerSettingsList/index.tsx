import React, { useMemo } from 'react';
import { Collapse } from 'antd';
import { PlayerSettings } from '@/types';
import PlayerSettingsItem from '@/components/PlayerSettingsItem';

const { Panel } = Collapse;

interface PlayerSettingsListProps {
  players: PlayerSettings[];
}

const PlayerSettingsList: React.FC<PlayerSettingsListProps> = ({ players }) => {
  const panels = useMemo(() => {
    return players.map((player, index) => (
      <Panel header={`Player ${index}`} key={`player${index}`}>
        <PlayerSettingsItem player={player} />
      </Panel>
    ));
  }, [players]);
  return (
    <Collapse>
      {panels}
    </Collapse>
  )
}

export default PlayerSettingsList;

