const getAccountBalance = async ({ account, log=True }) => {
    let balance = await hre.ethers.provider.getBalance(account.address)
    let balanceEth = hre.ethers.utils.formatEther(balance)
    if (log)
        console.log(`Current balance: ${balanceEth} ETH`)
    return balance
}

const main = async () => {
    const [owner, randomPerson] = await hre.ethers.getSigners()
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal")
    const waveContract = await waveContractFactory.deploy({
        value: hre.ethers.utils.parseEther('0.1')
    })
    await waveContract.deployed()

    console.log("Contract deployed to:", waveContract.address)
    getAccountBalance({ account: waveContract, log: true })
    getAccountBalance({ account: owner, log: true })
    console.log("Contract deployed by:", owner.address)

    // await owner.send()

    let waveCount = await waveContract.getTotalWaves()

    // Send waves and check contract balance
    let waveTxn = await waveContract.wave("Self-wave!") // owner's transaction
    await waveTxn.wait()
    getAccountBalance({ account: waveContract, log: true })

    waveCount = await waveContract.getTotalWaves()

    waveTxn = await waveContract.connect(randomPerson).wave("Hey man!")
    await waveTxn.wait()
    getAccountBalance({ account: waveContract, log: true })

    waveTxn = await waveContract.connect(randomPerson).wave("How you doin?")
    await waveTxn.wait()
    getAccountBalance({ account: waveContract, log: true })

    waveTxn = await waveContract.connect(randomPerson).wave("You there?")
    await waveTxn.wait()
    getAccountBalance({ account: waveContract, log: true })

    // Check waves
    waveCount = await waveContract.getTotalWaves()
    console.log(`Total waves: ${waveCount}`)

    // wavesRandomPerson = await waveContract.getTotalWavesPerAddress(randomPerson.address)
    let allWaves = await waveContract.getAllWaves()
    console.log('\n>>First wave data structure content:')
    for (let i = 0; i < allWaves[0].length; i++) {
        console.log(allWaves[0][i])
    }

    let randomPersonWaves = await waveContract.getWavesPerAddress(randomPerson.address)
    console.log("\n>>My buddy randomPerson's waves:")
    console.log(randomPersonWaves)
    
}

const runMain = async () => {
    try {
        await main()
        process.exit(0)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

runMain()