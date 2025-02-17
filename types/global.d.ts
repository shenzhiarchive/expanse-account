declare global {
  interface Window {
    __navigate: ReturnType<typeof useNavigate>
  }
}

export {}
