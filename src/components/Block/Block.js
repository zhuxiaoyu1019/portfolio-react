import React from 'react';
import { Button } from '@material-ui/core';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import "./Block.scss"

const imgArr = [
    {
        img: "https://res.cloudinary.com/drdwcvbe8/image/upload/v1615578037/portfolio/groupup_ac3efa.png",
        name: "GroupUp"
    },
    {
        img: "https://res.cloudinary.com/drdwcvbe8/image/upload/v1615578042/portfolio/gun-violence-data-report_tga6bf.png",
        name: "DataReport"
    },
    {
        img: "https://res.cloudinary.com/drdwcvbe8/image/upload/v1615578035/portfolio/pizzacutter_zpxyiq.png",
        name: "Pizzacutter"
    },
    {
        img: "https://res.cloudinary.com/drdwcvbe8/image/upload/v1615578038/portfolio/RadCaTS_mkrm69.png",
        name: "RadCaTS"
    },
    {
        img: "https://res.cloudinary.com/drdwcvbe8/image/upload/v1615578043/portfolio/the-full-tankard_kzvigz.png",
        name: "FullTankard"
    }
]

const Block = ({ pathName, name, descp, deploy, repo, demo, prototype }) => {
    const findImg = () => {
        const targetImg = imgArr.find(img => img.name === pathName)
        return targetImg.img
    }

    return (
        <div className="card">
            <div className="media-wrapper">
                <LazyLoadImage className="media" src={findImg()} alt={name} />
            </div>
            <div className="overlay">
                <h3 className="name">{name}</h3>
                <div className="btns">
                    {repo ?
                        <>
                            <Button href={deploy} target="_blank">View App</Button>
                            <Button href={repo} target="_blank">View Code</Button>
                        </>
                        :
                        <>
                            <Button href={demo} target="_blank">View Demo</Button>
                            <Button href={prototype} target="_blank">View Prototype</Button>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

export default Block;