import React from "react";
import PageLayout from "../../layouts/PageLayout";
import Greetings from "../../components/main/Greetings";
import AdCarousel from "../../components/main/AdCarousel";
import TopCategories from "../../components/main/Actions";
import Programs from "../../components/main/Programs";
import HappeningToday from "../../components/main/HappeningToday";

export default function HomeScreen() {
  return (
    <PageLayout variant="light">
      <Greetings />
      <AdCarousel />
      <TopCategories />
      <Programs />
      <HappeningToday />
    </PageLayout>
  );
}
