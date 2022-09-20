import {useEffect, useState} from 'react';
import slootslogotransparent from '../assets/slootslogotransparent.png';
import {ChainId, useAddress, useClaimNFT, useContract, useNetwork, useNetworkMismatch} from '@thirdweb-dev/react';
import Select from 'react-select';

const Body = () => {
	const [mintNumber, setMintNumber] = useState(1);
	const [totalClaimed, setTotalClaimed] = useState(null);
	const [hasMinted, setHasMinted] = useState(false);
	const maxSupply = 501 // TODO: update this
	const address = useAddress()
	const [{networkData, networkError, networkLoading}, switchNetwork] = useNetwork();
	const isMismatched = useNetworkMismatch();
	const {contract} = useContract("0x432Cf9354F51EA362A03203D71915d07cFe8ACE7")
	const {mutate: claimNFT, isLoading, error} = useClaimNFT(contract)

	const dropdownOptions = [
		{ value: 1, label: "1" },
		{ value: 2, label: "2" },
		{ value: 3, label: "3" },
		{ value: 4, label: "4" },
		{ value: 5, label: "5" }
	]

	const optionSelected = (selectedOption) => {
		setMintNumber(selectedOption.value)
	};

	useEffect(() => {
		console.log(`network mismatch? ${isMismatched}`)
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

	return (
		<div className="bg-no-repeat bg-cover bg-center h-full flex flex-grow">
			<div className="flex flex-col justify-end items-center mx-auto py-10">
				<img src={slootslogotransparent} alt=""/>
				<h1 className="text-white text-4xl font-bold text-center pb-4">
					Gm, sloot. Your ticket to slootopia awaits…
				</h1>
				<p className="text-white text-lg font-bold text-center">
					Connect your wallet to mint some lil' sloots.
				</p>
				<p className="text-white text-sm text-center">
					(Limit 5 per wallet.)
				</p>
				<div className="flex items-center">
					{(address === undefined) ? (
						<p className="text-white text-md my-4">Connect a wallet to mint...</p>
					) : (<>
						{(isMismatched) ? (
							<button
								className="enabled:shadow-lg enabled:shadow-black text-white bg-[#e32970] hover:bg-[#bd255f] p-2 rounded-lg cursor-pointer my-4"
								onClick={requestNetworkSwitch}
							>
								Switch Network
							</button>
						) : (<>
							<Select options={dropdownOptions} isSearchable={false} defaultValue={dropdownOptions[0]} onChange={optionSelected} />
							<button
								className="button-border text-white bg-[#f213a4] hover:bg-[#df0c95] disabled:bg-[#808080] p-2 rounded-lg cursor-pointer my-4 ml-4"
								onClick={mint}
								disabled={isLoading || hasMinted}
							>
								mint {mintNumber} lil' sloot{mintNumber === 1 ? ('') : ('s')}
							</button>
							</>)}
					</>)}
				</div>
				{totalClaimed === null ? (
					<span className="text-xs text-white font-bold">
	                    ? /{maxSupply}
	                </span>
				) : (
					<span className="text-xs text-white font-bold">
	                    {totalClaimed}/{maxSupply}
	                </span>
				)}
			</div>
		</div>
	)
}

export default Body;
