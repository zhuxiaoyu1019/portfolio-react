import React, { useState, useEffect } from 'react';
import mixitup from 'mixitup';
import { Tab, Tabs } from '@material-ui/core';
import useOnScreen from "../../components/InView";
import Block from "../../components/Block/Block";
import Title from "../../components/Title/Title";
import "./Portfolio.scss";

const Portfolio = ({ clickState, setClickState }) => {
    const [value, setValue] = useState(0);
    const [setRef, visible] = useOnScreen({ threshold: 0.2 })

    useEffect(() => {
        if (visible) {
            setClickState({ ...clickState, about: false, portfolio: true, contact: false })
        }
    }, [visible])

    const handleChange = (e, newValue) => {
        e.preventDefault();
        setValue(newValue);
    };

    const a11yProps = (index) => {
        return {
            id: `scrollable-auto-tab-${index}`,
            'aria-controls': `scrollable-auto-tabpanel-${index}`,
        };
    }

    useEffect(() => {
        mixitup('.filter-container', {
            selectors: {
                target: '.filter-item'
            },
            "animation": {
                "duration": 460,
                "nudge": false,
                "reverseOut": false,
                "effects": "fade scale(0.27) translateY(20%) stagger(30ms)"
            }
        })
    }, [handleChange])

    return (
        <div id="portfolio" className="container" ref={setRef}>
            <Title title="SOME OF MY PAST PROJECTS" />
            <Tabs
                value={value}
                indicatorColor="primary"
                textColor="primary"
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                style={{ margin: "30px 15px 10px" }}
            >
                <Tab label="ALL" data-filter="all" {...a11yProps(0)} />
                <Tab label="JAVASCRIPT" data-filter=".js" {...a11yProps(1)} />
                <Tab label="REACTJS" data-filter=".react" {...a11yProps(2)} />
                <Tab label="SHINY" data-filter=".shiny" {...a11yProps(3)} />
                <Tab label="FIGMA" data-filter=".figma" {...a11yProps(4)} />
            </Tabs>
            <div className="filter-container">
                <div className="filter-item mix react">
                    <Block
                        pathName="RadCaTS"
                        name="RadCaTS Karaoke"
                        deploy="https://radcats-karaoke.herokuapp.com/"
                        repo="https://github.com/chomieu/RadCaTS-Karaoke.git"
                    />
                </div>
                <div className="filter-item mix js">
                    <Block
                        pathName="FullTankard"
                        name="The Full Tankard"
                        deploy="https://seagda.github.io/the-full-tankard/"
                        repo="https://github.com/seagda/the-full-tankard.git"
                    />
                </div>
                <div className="filter-item mix js">
                    <Block
                        pathName="Pizzacutter"
                        name="PizzaCutter Client Page & Owner Dashboard"
                        deploy="https://pizzacutterapp.herokuapp.com/pizzacutter"
                        repo="https://github.com/zhuxiaoyu1019/online-order-system.git"
                    />
                </div>
                <div className="filter-item mix shiny">
                    <Block
                        pathName="DataReport"
                        name="Gun Violence Data Report"
                        deploy="https://xiaoyuz.shinyapps.io/Gun_Violence_Data_Report/"
                        repo="https://github.com/info201b-au20/project-InfoBG-Group2.git"
                    />
                </div>
                <div className="filter-item mix figma">
                    <Block
                        pathName="GroupUp"
                        name="GroupUp"
                        demo="https://www.figma.com/proto/vUrgpxA2wabdSZbuskqyE4/GroupUp?node-id=1%3A3510&scaling=scale-down"
                        prototype="https://www.figma.com/file/vUrgpxA2wabdSZbuskqyE4/GroupUp?node-id=0%3A1"
                    />
                </div>
            </div>
        </div >
    )
}

export default Portfolio;
