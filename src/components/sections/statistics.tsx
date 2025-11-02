import React from 'react';

const StatisticsSection = () => {
  const stats = [
    {
      value: "300+",
      description: "successful agency projects - Brand Identity, Website Design, Product Packaging",
    },
    {
      value: "10",
      description: "years in business improving digital design products for our customers",
    },
    {
      value: "9.8",
      description: "average NPS* we receive from our clients",
      footnote: "*Net Promoter Score — willingness to recommend a service from 1-10",
    },
  ];

  return (
    <section className="bg-white py-24 lg:py-40">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-3 lg:gap-x-8">
          {stats.map((stat, index) => (
            <div key={index}>
              <h2 className="text-[72px] font-bold leading-none -tracking-[0.03em] text-black lg:text-[120px]">
                {stat.value}
              </h2>
              <div className="my-6 h-px w-[60px] bg-[#DDDDDD]" />
              <p className="max-w-[300px] text-lg leading-relaxed text-[#666666]">
                {stat.description}
              </p>
              {stat.footnote && (
                <p className="mt-4 text-xs text-[#999999]">
                  {stat.footnote}
                </p>
              )}
            </div>
          ))}
        </div>
        <div className="mt-24">
          <a
            href="/agency"
            className="text-base font-semibold text-[#F45D2F] hover:underline"
          >
            About DD.NYC® &gt;
          </a>
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;