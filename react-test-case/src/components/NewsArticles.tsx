import React, { useEffect, useState } from "react";
import { Card, Input, Spin, Button, Result, DatePicker } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { api } from "../api/api";
import NewsList from "./NewsList";
import moment, { Moment } from "moment";
const { RangePicker } = DatePicker;

const NewsArticles: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>("Apple");
    const [articles, setArticles] = useState<any[]>([]);
    const [news, setNews] = useState<any[]>([]);
    const [search, setSearch] = useState<string>("");
    const [searchClicked, setSearchClicked] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [mulai, setMulai] = useState<string>("");
    const [selesai, setSelesai] = useState<string>("");

    const tabList = [
        {
            key: "Apple",
            tab: "Apple",
        },
        {
            key: "Tesla",
            tab: "Tesla",
        },
        {
            key: "Business",
            tab: "Business",
        },
        {
            key: "TechCrunch",
            tab: "TechCrunch",
        },
        {
            key: "Wall Street Journal",
            tab: "Wall Street Journal",
        },
    ];

    useEffect(() => {
        fetchData(activeTab);
    }, [activeTab, mulai, selesai]);

    const fetchData = async (tab: string) => {
        setLoading(true);
        setError(null);

        let url = "";
        try {
            if (tab === "Apple") {
                url = `/everything?q=apple&from=${mulai}&to=${selesai}&apiKey=9733a2a064024e36949e8d6a3a5baf9a`;
            } else if (tab === "Tesla") {
                url = `/everything?q=tesla&from=${mulai}&to=${selesai}&apiKey=9733a2a064024e36949e8d6a3a5baf9a`;
            } else if (tab === "Business") {
                url = `/everything?q=business&from=${mulai}&to=${selesai}&apiKey=9733a2a064024e36949e8d6a3a5baf9a`;
            } else if (tab === "TechCrunch") {
                url = `/everything?sources=techcrunch&from=${mulai}&to=${selesai}&apiKey=9733a2a064024e36949e8d6a3a5baf9a`;
            } else if (tab === "Wall Street Journal") {
                url = `/everything?domains=wsj.com&from=${mulai}&to=${selesai}&apiKey=9733a2a064024e36949e8d6a3a5baf9a`;
            }

            const res = await api().get(url);
            setArticles(res.data.articles);
            setLoading(false);
        } catch (error) {
            setError("There was an error loading the data.");
            setLoading(false);
        }
    };


    const onTabChange = (key: string) => {
        setActiveTab(key);
    };

    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        setSearchClicked(false);
    };

    const handleSearchClick = () => {
        setSearchClicked(true);
    };

    function filterNews(newsItem: any) {
        if (!search) {
            return true;
        }

        const lowerCaseQuery = search.toLowerCase();
        return (
            (newsItem.title &&
                newsItem.title.toLowerCase().includes(lowerCaseQuery)) ||
            (newsItem.description &&
                newsItem.description.toLowerCase().includes(lowerCaseQuery))
        );
    }

    const filteredArticles = searchClicked
        ? articles.filter(filterNews)
        : articles;

        console.log("news",news)
        console.log("articles",articles)

    return (
        <>
            <div className="flex justify-center w-screen">
                <div className="flex flex-wrap gap-5 p-10 w-full justify-center">
                    <Card
                        style={{ width: "100%" }}
                        title="All Articles"
                        tabList={tabList}
                        activeTabKey={activeTab}
                        onTabChange={onTabChange}
                        extra={
                            <div className="flex gap-4 items-center">
                                <RangePicker onChange={(dates, dateStrings) => {
                                    if (dates && dates.length === 2) {
                                        setMulai(dateStrings[0]);
                                        setSelesai(dateStrings[1]);
                                    }
                                }} />
                                <div className="flex gap-2">
                                    <Input
                                        placeholder={`Search ${activeTab} Article `}
                                        onChange={handleSearchInputChange}
                                        allowClear
                                    />
                                    <Button icon={<SearchOutlined />} onClick={handleSearchClick} />
                                </div>
                            </div>
                        }
                    >
                        {loading ? (
                            <div className="text-center">
                                <Spin size="large" />
                            </div>
                        ) : error ? (
                            <Result status="warning" title={error} />
                        ) : (
                            <NewsList news={filteredArticles} />
                        )}
                    </Card>
                </div>
            </div>
        </>
    );
};

export default NewsArticles;
