import aboutStatic from '../../content/about.json';

export function useAbout() {
  return {
    about: aboutStatic,
    loading: false,
    error: null,
  };
}
