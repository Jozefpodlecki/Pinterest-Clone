namespace ImageScraper
{
    public class MainOptions
    {
        public string Url { get; set; }
        public int InteractionTimeout { get; set; }
        public int SwitchWindowTimeout { get; set; }
        public int ScrollTimeout { get; set; }
        public bool MaximizeWindow { get; set; }
        public string OutputDirectoryName { get; set; }
        public string OutputFileName { get; set; }
    }
}
