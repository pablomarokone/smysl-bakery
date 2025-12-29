import footerStatic from '../../content/footer.json';

export function useFooter() {
  return {
    footer: footerStatic,
    loading: false,
    error: null,
  };
}
