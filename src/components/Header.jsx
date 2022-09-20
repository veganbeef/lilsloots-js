import { ConnectWallet } from "@thirdweb-dev/react";

const Header = () => {
	return (
		<nav className="w-full flex justify-between items-center p-4">
			<span className="text-white text-2xl ml-2">lil' sloots</span>
			<ConnectWallet accentColor="#f213a4" colorMode="light" />
		</nav>
	)
}

export default Header
