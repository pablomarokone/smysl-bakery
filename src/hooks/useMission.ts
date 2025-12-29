import missionStatic from '../../content/mission.json';

export function useMission() {
  return {
    mission: missionStatic,
    loading: false,
    error: null,
  };
}
