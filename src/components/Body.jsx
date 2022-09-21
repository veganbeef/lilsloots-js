import {useEffect, useState} from 'react';
import slootslogotransparent from '../assets/slootslogotransparent.png';
import {ChainId, useAddress, useClaimNFT, useClaimIneligibilityReasons, useContract, useNetwork, useNetworkMismatch} from '@thirdweb-dev/react';

const Body = () => {
	const [mintNumber, setMintNumber] = useState(1);
	const [totalClaimed, setTotalClaimed] = useState(null);
	const [hasMinted, setHasMinted] = useState(false);
	const maxSupply = 501 // TODO: update this
	const address = useAddress();
	const [, switchNetwork] = useNetwork();
	const isMismatched = useNetworkMismatch();
	const {contract} = useContract("0x432Cf9354F51EA362A03203D71915d07cFe8ACE7");
	const {mutate: claimNFT, isClaimLoading} = useClaimNFT(contract);
	const {data: ineligibilityReasons} = useClaimIneligibilityReasons(contract, {walletAddress: address, quantity: 1});
	const now = new Date();
	const prelistStart = new Date('Wed Sep 21 2022 10:02 GMT-0400');
	const slootlistStart = new Date('Wed Sep 21 2022 11:11 GMT-0400');
	const slootlistEnd = new Date('Wed Sep 21 2022 12:20 GMT-0400')

	useEffect(() => {
		const getTotalClaimedSupply = async () => {
			if (contract) {
				const totalClaimedSupply = (await contract.totalClaimedSupply()).toNumber();
				setTotalClaimed(totalClaimedSupply);
			}
		};
		getTotalClaimedSupply();
	}, [contract, hasMinted, isMismatched]);

	const requestNetworkSwitch = () => {
		switchNetwork(ChainId.Mumbai)
	}

	const mint = async () => {
		console.log('minting');
		claimNFT({to: address, quantity: mintNumber});
		setHasMinted(true);
	}

	const incrementMintNumber = () => {
		let mintNumberMax = 5;
		if (now > slootlistStart && now < slootlistEnd) {
			mintNumberMax = 10;
		}
		if (mintNumber < mintNumberMax) {
			setMintNumber(mintNumber + 1);
		}
	}

	const decrementMintNumber = () => {
		if (mintNumber > 1) {
			setMintNumber(mintNumber - 1);
		}
	}

	return (
		<div className="bg-no-repeat bg-cover bg-center h-full flex flex-grow">
			<div className="flex flex-col justify-between items-center mx-auto pt-20 pb-10">
				<img src={slootslogotransparent} style={{width: "80%"}} alt="lil' sloots logo"/>
				<div className="flex flex-col items-center">
					<h1 className="text-white text-4xl font-bold text-center pb-4">
						Gm, sloot. Your ticket to slootopia awaits…
					</h1>
					{(now < prelistStart) ? (
						<p className="text-white text-lg text-center py-10">
							Minting at 11:11am ET on hump day, 9/21
						</p>
					) : (<>
						{(!!ineligibilityReasons && ineligibilityReasons.length > 0) ? (
							<p className="text-white text-lg text-center py-6">
								Connected wallet is ineligible to mint during this phase
							</p>
						) : (


						<div className="flex items-center">
							{(address === undefined) ? (
								<p className="text-white text-lg font-bold text-center py-6">
									Connect your wallet to mint some lil' sloots.
								</p>
							) : (<>
								{(isMismatched) ? (
									<button
										className="button-border text-white bg-[#f213a4] hover:bg-[#df0c95] p-2 rounded-lg cursor-pointer my-4"
										onClick={requestNetworkSwitch}
									>
										Switch Network
									</button>
								) : (<>
										<div className="custom-number-input h-10 w-24">
											<div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent">
												<button onClick={decrementMintNumber}
												        className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l-lg cursor-pointer outline-none">
													<span className="m-auto text-2xl font-thin">−</span>
												</button>
												<input type="number" style={{border: 0, pointerEvents: 'none'}}
												       className="outline-none focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none"
												       name="custom-input-number" value={mintNumber} readOnly></input>
												<button onClick={incrementMintNumber}
												        className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r-lg cursor-pointer">
													<span className="m-auto text-2xl font-thin">+</span>
												</button>
											</div>
										</div>
										<button
											className="button-border text-white bg-[#f213a4] hover:bg-[#df0c95] disabled:bg-[#808080] p-2 rounded-lg cursor-pointer my-4 ml-4"
											onClick={mint}
											disabled={isClaimLoading || hasMinted || (!!ineligibilityReasons && ineligibilityReasons.length > 0)}
										>
											Mint {mintNumber} lil' sloot{mintNumber === 1 ? ('') : ('s')}
										</button>
									</>)}
							</>)}
						</div>
						)}
						<p className="text-white text-sm text-center">
							Limit {(now > slootlistStart && now < slootlistEnd) ? ('10') : ('5')} per wallet
						</p>
						{totalClaimed === null ? (
							<span className="text-xs text-white">
			                    ? /{maxSupply}
			                </span>
						) : (
							<span className="text-xs text-white">
			                    {totalClaimed}/{maxSupply} minted
			                </span>
						)}
					</>)}
				</div>
			</div>
		</div>
	)
}

export default Body;
