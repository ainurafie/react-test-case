import React, { useEffect, useState } from "react";
import { Card, Pagination } from "antd";
import image from "../assets/noImage.png";
const { Meta } = Card;

const NewsList: React.FC<{ news: any[] }> = ({ news }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedNews, setSelectedNews] = useState(null);
	const [page, setPage] = useState(1);
	const itemsPerPage = 16;

	useEffect(() => {
		setPage(1);
	}, [news]);

	const startIndex = (page - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const filteredNews = news
		.filter((val) => val?.title !== "[Removed]")
		.slice(startIndex, endIndex);

	const handlePageChange = (page: number) => {
		window.scrollTo({ top: 0, behavior: "smooth" });
		setPage(page);
	};

	return (
		<>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-2 justify-center">
				{filteredNews?.length
					? filteredNews.map(
						(val: any, index: number) =>
							val?.title !== "[Removed]" && (
								<Card
									key={index}
									// onClick={() => }
									hoverable
									className="max-w-sm"
									cover={
										<img
											style={{ height: 180 }}
											alt="imageNews"
											src={val?.urlToImage || image}
										/>
									}
								>
									<Meta title={val?.title} description={val?.description} />
								</Card>
							)
					)
					: "Article not found"}
			</div>
			{news?.length ? (
				<div className="flex justify-center mt-4">
					<Pagination
						current={page}
						total={news?.length}
						pageSize={itemsPerPage}
						onChange={handlePageChange}
						showSizeChanger={false}
					/>
				</div>
			) : null}

		</>
	);
};

export default NewsList;
