const Footer = () => (
	<div className="w-full h-20 flex md:justify-center justify-between items-center flex-col p-4">
		<div className="flex justify-between items-center w-full">
			<div className="flex">
				<div className="flex flex-col items-center">
					<p className="text-white text-xs">
						lil' sloots © 2022
					</p>
					<p className="text-white text-xs">
						with love 💜 <a href="https://twitter.com/_veganbeef">veganbeef</a>
					</p>
				</div>
			</div>
			<div className="flex flex-end">
				<a className="pl-5 text-white hover:underline" href="https://twitter.com/lilsloots">
					Follow us on Twitter for slooty updates
				</a>
			</div>
		</div>
	</div>
)

export default Footer
