import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';

interface ArticleContentProps {
  content: string;
}

const ArticleContent = ({ content }: ArticleContentProps) => {
  return (
    <div className="prose prose-lg prose-slate max-w-none
      prose-headings:font-heading prose-headings:font-bold prose-headings:text-foreground
      prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h2:border-b prose-h2:border-border prose-h2:pb-2
      prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
      prose-h4:text-lg prose-h4:mt-4 prose-h4:mb-2
      prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-4
      prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-a:font-medium
      prose-strong:text-foreground prose-strong:font-semibold
      prose-em:text-foreground
      prose-ul:my-4 prose-ul:list-disc prose-ul:pl-6
      prose-ol:my-4 prose-ol:list-decimal prose-ol:pl-6
      prose-li:text-muted-foreground prose-li:my-1
      prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-muted-foreground prose-blockquote:bg-secondary/30 prose-blockquote:py-2 prose-blockquote:my-4
      prose-code:text-primary prose-code:bg-secondary prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:before:content-none prose-code:after:content-none
      prose-pre:bg-secondary prose-pre:border prose-pre:border-border prose-pre:rounded-lg prose-pre:p-4 prose-pre:overflow-x-auto
      prose-img:rounded-lg prose-img:shadow-md prose-img:my-6
      prose-hr:border-border prose-hr:my-8
      prose-table:border-collapse prose-table:w-full prose-table:my-6
      prose-th:bg-secondary prose-th:border prose-th:border-border prose-th:px-4 prose-th:py-2 prose-th:text-left prose-th:font-semibold
      prose-td:border prose-td:border-border prose-td:px-4 prose-td:py-2
    ">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeSanitize]}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default ArticleContent;
