const COLORS = exports.COLORS = {
  light: {
    name: {
      bg: 'bg-washed-red',
      color: 'dark-gray'
    },
    hex: {
      bg: '#FFDFDF',
      color: '#333333'
    }
  },
  dark: {
    name: {
      bg: 'bg-navy',
      color: 'moon-gray'
    },
    hex: {
      bg: '#001B44',
      color: '#CCCCCC'
    }
  }
}

exports.THEME = {
  light: `${COLORS.light.name.bg} ${COLORS.light.name.color}`,
  dark: `${COLORS.dark.name.bg} ${COLORS.dark.name.color}`
}
