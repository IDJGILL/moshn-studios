interface FooterProps extends React.HTMLAttributes<HTMLElement> {}

export default function Footer({ ...props }: FooterProps) {
  const {} = props

  return (
    <footer className='bg-black border-t border-white/10 py-4 z-50'>
      <div className='text-center'>©2024 Moshn Studios All rights reserved.</div>
    </footer>
  )
}
