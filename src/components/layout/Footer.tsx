
export default function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Droppurity. All rights reserved.</p>
        <p className="mt-1">Pure Water, Pure Life.</p>
      </div>
    </footer>
  );
}
