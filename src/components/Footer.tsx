export default function Footer() {
  return (
    <footer className="bg-[var(--bg-secondary)] border-t border-[var(--border)] text-[var(--text-secondary)] text-center py-8 mt-16">
      <p>&copy; {new Date().getFullYear()} StudyPro. All rights reserved.</p>
    </footer>
  );
}
