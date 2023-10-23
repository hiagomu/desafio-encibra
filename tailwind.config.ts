import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primaryColor: '#000',
        secondaryColor: '#9796A8',
        buttonExitBg: 'rgba(0, 0, 0, 0.3)',
        buttonExitBgHover: 'rgba(0, 0, 0, 0.2)',
        dropdownButtonBg: 'rgba(0, 0, 0, 0.1)',
        dropdownButtonBgHover: 'rgba(0, 0, 0, 0.3)',
        secondaryBg: '#D9D9D9',
        buttonBg: '#5151FA', 
        buttonBgHover: '#7A7AF0',
        buttonSaveBg: '#10B910', 
        buttonSaveBgHover: '#56CD56', 
        buttonRemoveBg: '#FF4F4F', 
        buttonRemoveBgHover: '#E85E5E', 
        inProgressColor: '#10B910', 
        finishedColor: '#FF4F4F', 
        waitingColor: '#E5DF4D',
        sidebarBg: '#343268',
        sidebarBgSelected: '#48468E',
        sidebarText: '#6865A7',
        inputBg: '#F5F5F8',
        labelText: '#8189A6'
      },
      boxShadow: {
        'primary': '0px 5px 15px rgba(0, 0, 0, 0.2)',
      },
    }
  },
  plugins: [],
}
export default config
