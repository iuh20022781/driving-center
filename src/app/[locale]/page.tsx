'use client';

import HeroBanner from '@/components/home/HeroBanner';
import LargeFieldInfo from '@/components/home/LargeFieldInfo';
import FeaturesGrid from '@/components/home/FeaturesGrid';
import EnrollmentTable from '@/components/home/EnrollmentTable';
import CarCourses from '@/components/home/CarCourses';
import LatestPosts from '@/components/home/LatestPosts';
import RegisterForm from '@/components/home/RegisterForm';

export default function Home() {
  return (
    <>
      <HeroBanner />
      <LargeFieldInfo />
      <FeaturesGrid />
      <EnrollmentTable />
      <CarCourses />
      <LatestPosts />
      <RegisterForm />
    </>
  );
}