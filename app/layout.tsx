import Nav from '@/src/FE/components/utils/Nav'
import '../styles/globals.css'
import Raleway from 'next/font/local'
import Footer from '@/src/FE/components/utils/Footer'

const raleway = Raleway({
  src:[
    {
      path:'../public/fonts/raleway/Raleway-Thin.ttf',
      weight:'200'
    },{
      path:'../public/fonts/raleway/Raleway-Regular.ttf',
      weight:'500'

    },{
      path:'../public/fonts/raleway/Raleway-Bold.ttf',
      weight:'700'

    },{
      path:'../public/fonts/raleway/Raleway-ExtraBold.ttf',
      weight:'900'
    }
  ]
})

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={raleway.className}>
        <Nav />
        {children}
        <Footer />
        </body>
    </html>
  )
}
